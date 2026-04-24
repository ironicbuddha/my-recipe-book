#!/usr/bin/env tsx
/**
 * Batch-generates per-recipe hero images using OpenAI gpt-image-2.
 *
 * Modes:
 *   --reference        generate 4 candidate reference images (text-to-image)
 *   --only <slug>      regenerate a single recipe (image-to-image with reference)
 *   (default)          generate heroes for every recipe missing one
 *
 * Flags:
 *   --force            regenerate even if the output file already exists
 *   --dry-run          print prompts and cost estimate, do not call the API
 *   --help             usage message
 */
import fs from 'node:fs';
import path from 'node:path';
import OpenAI from 'openai';
import { RECIPES_DIR, buildPrompt } from './hero-prompt.js';

const MODEL = 'gpt-image-2-2026-04-21';
const SIZE = '1536x1024';
const COST_PER_IMAGE_USD = 0.1;
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
  ].join('\n');
  console[exitCode === 0 ? 'log' : 'error'](msg);
  process.exit(exitCode);
}

function parseArgs(argv: string[]): Args {
  const args: Args = { mode: 'batch', force: false, dryRun: false };
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
  // Mirror the slug derivation used elsewhere: strip .md, lowercase,
  // replace non-alphanumeric runs with single hyphens, trim hyphens.
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
  mode: 'generate' | 'edit';
}

function planReferenceJobs(): PlannedJob[] {
  return Array.from({ length: REFERENCE_CANDIDATE_COUNT }, (_, i) => ({
    label: `reference candidate ${i + 1}`,
    outputPath: path.join(OUTPUT_DIR, `_reference_candidate_${i + 1}.png`),
    prompt: REFERENCE_PROMPT,
    mode: 'generate',
  }));
}

function planRecipeJobs(args: Args): PlannedJob[] {
  const allFiles = fs.readdirSync(RECIPES_DIR).filter((f) => f.endsWith('.md'));
  const targets =
    args.mode === 'only' && args.only
      ? allFiles.filter((f) => slugForFile(f).includes(args.only!.toLowerCase().replace(/[^a-z0-9]+/g, '-')))
      : allFiles;

  if (args.mode === 'only' && targets.length !== 1) {
    throw new Error(
      targets.length === 0
        ? `No recipe matches --only "${args.only}".`
        : `Ambiguous --only "${args.only}". Matches: ${targets.map((t) => slugForFile(t)).join(', ')}`,
    );
  }

  if (!fs.existsSync(REFERENCE_PATH)) {
    throw new Error(
      `Reference image not found at ${REFERENCE_PATH}. Run with --reference first, pick a candidate, and rename it to _reference.png.`,
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
        mode: 'edit' as const,
      };
    })
    .filter((job) => args.force || !fs.existsSync(job.outputPath));
}

async function runReferenceJob(client: OpenAI, job: PlannedJob): Promise<void> {
  const response = await client.images.generate({
    model: MODEL,
    prompt: job.prompt,
    size: SIZE,
    n: 1,
  });
  const b64 = response.data?.[0]?.b64_json;
  if (!b64) throw new Error(`No image returned for ${job.label}`);
  fs.writeFileSync(job.outputPath, Buffer.from(b64, 'base64'));
}

async function runRecipeJob(client: OpenAI, job: PlannedJob): Promise<void> {
  const referenceStream = fs.createReadStream(REFERENCE_PATH);
  const response = await client.images.edit({
    model: MODEL,
    image: referenceStream,
    prompt: job.prompt,
    size: SIZE,
    n: 1,
  });
  const b64 = response.data?.[0]?.b64_json;
  if (!b64) throw new Error(`No image returned for ${job.label}`);
  fs.writeFileSync(job.outputPath, Buffer.from(b64, 'base64'));
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const jobs =
    args.mode === 'reference' ? planReferenceJobs() : planRecipeJobs(args);

  if (jobs.length === 0) {
    console.log('No work to do. All outputs already exist (use --force to override).');
    return;
  }

  if (jobs.length > HARD_CAP) {
    throw new Error(`Planned ${jobs.length} jobs exceeds hard cap of ${HARD_CAP}. Aborting.`);
  }

  const estimatedCost = (jobs.length * COST_PER_IMAGE_USD).toFixed(2);
  console.log(`Model: ${MODEL}`);
  console.log(`Size:  ${SIZE}`);
  console.log(`Jobs:  ${jobs.length}`);
  console.log(`Estimated cost: ~$${estimatedCost} USD (@ $${COST_PER_IMAGE_USD}/image)`);
  console.log('');

  for (const job of jobs) {
    console.log(`  [${job.mode}] ${job.label} → ${path.relative(process.cwd(), job.outputPath)}`);
  }
  console.log('');

  if (args.dryRun) {
    console.log('Dry run — no API calls made. Re-run without --dry-run to execute.');
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY is not set. Export it in your shell or use:\n' +
        '  OPENAI_API_KEY=sk-... pnpm gen-heroes ...',
    );
  }

  const client = new OpenAI({ apiKey });
  let completed = 0;
  for (const job of jobs) {
    process.stdout.write(`[${completed + 1}/${jobs.length}] ${job.label}... `);
    try {
      if (job.mode === 'generate') {
        await runReferenceJob(client, job);
      } else {
        await runRecipeJob(client, job);
      }
      completed += 1;
      console.log('done');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`FAILED: ${msg}`);
    }
  }

  console.log('');
  console.log(`Completed ${completed}/${jobs.length} jobs. Actual cost likely ~$${(completed * COST_PER_IMAGE_USD).toFixed(2)} USD.`);
  if (args.mode === 'reference') {
    console.log('');
    console.log('Next: review the _reference_candidate_*.png files, pick one,');
    console.log(`and rename it to ${path.relative(process.cwd(), REFERENCE_PATH)}.`);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
