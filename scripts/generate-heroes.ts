#!/usr/bin/env tsx
/**
 * Batch-generates per-recipe hero images using Replicate's Flux 1.1 Pro Ultra.
 *
 * Modes:
 *   --reference        generate 4 candidate reference images (text-only)
 *   --only <slug>      regenerate a single recipe (text + image_prompt ref)
 *   (default)          generate heroes for every recipe missing one
 *
 * Flags:
 *   --force            regenerate even if the output file already exists
 *   --dry-run          print prompts and cost estimate, do not call the API
 *   --help             usage message
 */
import fs from 'node:fs';
import path from 'node:path';
import Replicate from 'replicate';
import { RECIPES_DIR, buildPrompt } from './hero-prompt.js';

// Flux Kontext Max is used for recipe generation (text + input_image driven
// semantic editing). Flux 1.1 Pro Ultra is used for the initial reference
// candidates (text-only generation, where Pro Ultra's raw-photographic
// output is stronger).
const REFERENCE_MODEL = 'black-forest-labs/flux-1.1-pro-ultra';
const REFERENCE_MODEL_VERSION =
  '5ea10f739af9f6d4002fae9aee4c15be14c3c8d7f8b309e634bf68df09159863';
const RECIPE_MODEL = 'black-forest-labs/flux-kontext-max';
const RECIPE_MODEL_VERSION =
  '8389ed8e4b16016c44fcdcc3ad142cf1e182e0a1ecaf0347b3e5254303f2beac';
const COST_PER_REFERENCE_USD = 0.06;
const COST_PER_RECIPE_USD = 0.08;
const HARD_CAP = 28 * 3;
const REFERENCE_CANDIDATE_COUNT = 4;

const OUTPUT_DIR = path.join(process.cwd(), 'src', 'assets', 'recipes');
const REFERENCE_PATH = path.join(OUTPUT_DIR, '_reference.png');

const REFERENCE_PROMPT = [
  'A single food specimen photographed for a Modernist Cuisine reference plate.',
  '',
  'Framing: vertical cross-section of a layered baked specimen (a square of dense chocolate brownie or similar), centered in the frame, showing internal crumb, crackled surface, and structural layers clearly.',
  '',
  'Style rules: seamless stark white studio backdrop; flat even studio light from above; crisp edge-to-edge focus; no harsh shadows; single specimen centered; no hands; no utensils; no garnishes; no text; no labels; no measurement annotations; muted colour palette with restrained contrast; 3:2 aspect ratio; clinical laboratory photography aesthetic; no props; no context.',
].join('\n');

interface Args {
  mode: 'reference' | 'only' | 'batch';
  only?: string;
  force: boolean;
  dryRun: boolean;
  noReference: boolean;
}

function usage(exitCode = 0): never {
  const msg = [
    'Usage: pnpm gen-heroes [--reference | --only <slug>] [--force] [--dry-run]',
    '',
    'Modes (exactly one):',
    '  --reference        generate 4 candidate style-reference images',
    '  --only <slug>      generate a single recipe hero',
    '  (no mode flag)     batch-generate every recipe missing a hero',
    '',
    'Flags:',
    '  --force            regenerate even if output exists',
    '  --dry-run          print prompts + cost estimate, no API calls',
    '  --no-reference     generate recipes text-only via Pro Ultra, skip',
    '                     the style-reference image (useful when the',
    '                     reference pollutes recipe subjects)',
  ].join('\n');
  console[exitCode === 0 ? 'log' : 'error'](msg);
  process.exit(exitCode);
}

function parseArgs(argv: string[]): Args {
  const args: Args = { mode: 'batch', force: false, dryRun: false, noReference: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case '--reference':
        args.mode = 'reference';
        break;
      case '--only': {
        const next = argv[i + 1];
        if (!next) usage(1);
        args.mode = 'only';
        args.only = next;
        i++;
        break;
      }
      case '--force':
        args.force = true;
        break;
      case '--dry-run':
        args.dryRun = true;
        break;
      case '--no-reference':
        args.noReference = true;
        break;
      case '--help':
      case '-h':
        usage(0);
        break;
      default:
        console.error(`Unknown argument: ${arg}`);
        usage(1);
    }
  }
  return args;
}

function slugForFile(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface PlannedJob {
  label: string;
  outputPath: string;
  prompt: string;
  mode: 'reference' | 'recipe';
}

function planReferenceJobs(): PlannedJob[] {
  return Array.from({ length: REFERENCE_CANDIDATE_COUNT }, (_, i) => ({
    label: `reference candidate ${i + 1}`,
    outputPath: path.join(OUTPUT_DIR, `_reference_candidate_${i + 1}.png`),
    prompt: REFERENCE_PROMPT,
    mode: 'reference',
  }));
}

function planRecipeJobs(args: Args): PlannedJob[] {
  const allFiles = fs
    .readdirSync(RECIPES_DIR)
    .filter((f) => /^\d{4}-\d{2}-\d{2}/.test(f) && f.endsWith('.md'));
  const targets =
    args.mode === 'only' && args.only
      ? allFiles.filter((f) =>
          slugForFile(f).includes(args.only!.toLowerCase().replace(/[^a-z0-9]+/g, '-')),
        )
      : allFiles;

  if (args.mode === 'only' && targets.length !== 1) {
    throw new Error(
      targets.length === 0
        ? `No recipe matches --only "${args.only}".`
        : `Ambiguous --only "${args.only}". Matches: ${targets.map((t) => slugForFile(t)).join(', ')}`,
    );
  }

  if (!args.noReference && !fs.existsSync(REFERENCE_PATH)) {
    throw new Error(
      `Reference image not found at ${REFERENCE_PATH}. Run with --reference first, pick a candidate, and rename it to _reference.png. Or pass --no-reference to generate text-only.`,
    );
  }

  return targets
    .map((filename) => {
      const slug = slugForFile(filename);
      const outputPath = path.join(OUTPUT_DIR, `${slug}.png`);
      return {
        label: slug,
        outputPath,
        prompt: buildPrompt(path.join(RECIPES_DIR, filename)),
        mode: 'recipe' as const,
      };
    })
    .filter((job) => args.force || !fs.existsSync(job.outputPath));
}

type ReplicateOutput = unknown;

async function saveOutput(output: ReplicateOutput, outputPath: string): Promise<void> {
  // Replicate's SDK returns heterogeneous shapes depending on model/version.
  // Handle: string URL, array of URL strings, Node ReadableStream, or a
  // FileOutput-like object with a .url accessor.
  const first = Array.isArray(output) ? output[0] : output;

  const toUrl = (item: unknown): string | null => {
    if (typeof item === 'string') return item;
    if (item && typeof item === 'object' && 'url' in item) {
      const v = (item as { url: unknown }).url;
      if (typeof v === 'string') return v;
      if (typeof v === 'function') {
        const resolved = (v as () => unknown)();
        if (typeof resolved === 'string') return resolved;
        if (resolved instanceof URL) return resolved.toString();
      }
    }
    return null;
  };

  const url = toUrl(first);
  if (url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Download failed: HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(outputPath, buf);
    return;
  }

  // Stream fallback (e.g. ReadableStream).
  if (first && typeof first === 'object' && Symbol.asyncIterator in (first as object)) {
    const chunks: Uint8Array[] = [];
    for await (const chunk of first as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }
    fs.writeFileSync(outputPath, Buffer.concat(chunks));
    return;
  }

  throw new Error(
    `Unexpected Replicate output shape: ${typeof first} (${JSON.stringify(first).slice(0, 120)})`,
  );
}

async function runReferenceJob(client: Replicate, job: PlannedJob): Promise<void> {
  const output = await client.run(`${REFERENCE_MODEL}:${REFERENCE_MODEL_VERSION}`, {
    input: {
      prompt: job.prompt,
      aspect_ratio: '3:2',
      output_format: 'png',
      raw: true,
      safety_tolerance: 2,
    },
  });
  await saveOutput(output, job.outputPath);
}

async function runRecipeJob(
  client: Replicate,
  job: PlannedJob,
  noReference: boolean,
): Promise<void> {
  if (noReference) {
    // Text-only via Pro Ultra — used when the reference image pollutes
    // the subject rather than anchoring just the aesthetic.
    const output = await client.run(`${REFERENCE_MODEL}:${REFERENCE_MODEL_VERSION}`, {
      input: {
        prompt: job.prompt,
        aspect_ratio: '3:2',
        output_format: 'png',
        raw: true,
        safety_tolerance: 2,
      },
    });
    await saveOutput(output, job.outputPath);
    return;
  }

  const referenceBuffer = fs.readFileSync(REFERENCE_PATH);
  // Replicate's SDK accepts Blobs for file-valued inputs and uploads
  // them transparently. Keeps everything in one round trip.
  const referenceBlob = new Blob([referenceBuffer], { type: 'image/png' });

  const output = await client.run(`${RECIPE_MODEL}:${RECIPE_MODEL_VERSION}`, {
    input: {
      input_image: referenceBlob,
      prompt: job.prompt,
      aspect_ratio: '3:2',
      output_format: 'png',
      safety_tolerance: 2,
    },
  });
  await saveOutput(output, job.outputPath);
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const jobs = args.mode === 'reference' ? planReferenceJobs() : planRecipeJobs(args);

  if (jobs.length === 0) {
    console.log('No work to do. All outputs already exist (use --force to override).');
    return;
  }

  if (jobs.length > HARD_CAP) {
    throw new Error(`Planned ${jobs.length} jobs exceeds hard cap of ${HARD_CAP}. Aborting.`);
  }

  const usingPro = args.mode === 'reference' || args.noReference;
  const unitCost = usingPro ? COST_PER_REFERENCE_USD : COST_PER_RECIPE_USD;
  const modelRef = usingPro ? REFERENCE_MODEL : RECIPE_MODEL;
  const modelVersion = usingPro ? REFERENCE_MODEL_VERSION : RECIPE_MODEL_VERSION;
  const estimatedCost = (jobs.length * unitCost).toFixed(2);
  console.log(`Model: ${modelRef} @ ${modelVersion.slice(0, 12)}`);
  console.log(`Mode:  ${args.noReference ? 'text-only (no reference)' : args.mode === 'reference' ? 'reference candidates' : 'recipe with reference'}`);
  console.log(`Jobs:  ${jobs.length}`);
  console.log(`Estimated cost: ~$${estimatedCost} USD (@ $${unitCost}/image)`);
  console.log('');

  for (const job of jobs) {
    console.log(`  [${job.mode}] ${job.label} → ${path.relative(process.cwd(), job.outputPath)}`);
  }
  console.log('');

  if (args.dryRun) {
    console.log('Dry run — no API calls made. Re-run without --dry-run to execute.');
    return;
  }

  const apiKey = process.env.REPLICATE_API_TOKEN;
  if (!apiKey) {
    throw new Error(
      'REPLICATE_API_TOKEN is not set. Add to .env.local:\n' +
        '  REPLICATE_API_TOKEN=r8_...',
    );
  }

  const client = new Replicate({ auth: apiKey });
  let completed = 0;
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    process.stdout.write(`[${i + 1}/${jobs.length}] ${job.label}... `);
    try {
      if (job.mode === 'reference') {
        await runReferenceJob(client, job);
      } else {
        await runRecipeJob(client, job, args.noReference);
      }
      completed += 1;
      console.log('done');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`FAILED: ${msg}`);
      if (/\b(401|403)\b/.test(msg)) {
        console.log('');
        console.log('Aborting batch: auth/permission error will not resolve by retrying.');
        break;
      }
    }
  }

  console.log('');
  console.log(
    `Completed ${completed}/${jobs.length} jobs. Actual cost likely ~$${(completed * unitCost).toFixed(2)} USD.`,
  );
  if (args.mode === 'reference' && completed > 0) {
    console.log('');
    console.log('Next: review the _reference_candidate_*.png files, pick one,');
    console.log(`and rename it to ${path.relative(process.cwd(), REFERENCE_PATH)}.`);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
