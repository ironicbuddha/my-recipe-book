import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/** Keep lifecycle fixtures independent of subsequent real culinary Promotions. */
export function restoreGrandfatheredFixture(root: string): void {
  const inventories = path.join(root, 'records/migrations');
  for (const file of fs.readdirSync(inventories)) {
    if (!file.endsWith('.md')) continue;
    for (const line of fs
      .readFileSync(path.join(inventories, file), 'utf8')
      .split('\n')) {
      const cells = line
        .split('|')
        .map((cell) => cell.trim().replaceAll('`', ''));
      if (cells[5] !== 'retain-canonical') continue;
      const key = cells[2]?.replace(/^recipe\//u, '');
      const historical = path.join(
        root,
        'recipes/superseded',
        `${key}@${cells[4]}.md`,
      );
      if (fs.existsSync(historical)) {
        fs.copyFileSync(historical, path.join(root, cells[1]));
        fs.rmSync(historical);
      }
    }
  }
  // Keep later non-grandfathered intakes as exact drafts when removing their
  // Promotion/evidence records. Curation references must still resolve.
  const promotions = path.join(root, 'records/promotions');
  if (fs.existsSync(promotions)) {
    for (const file of fs.readdirSync(promotions)) {
      if (!file.endsWith('.md')) continue;
      const promotion = matter(
        fs.readFileSync(path.join(promotions, file), 'utf8'),
      ).data;
      for (const recipeFile of fs.readdirSync(path.join(root, 'recipes'))) {
        if (!recipeFile.endsWith('.md')) continue;
        const source = path.join(root, 'recipes', recipeFile);
        const recipe = matter(fs.readFileSync(source, 'utf8')).data;
        if (
          recipe.identity !== promotion.recipe ||
          recipe.version !== promotion.version
        )
          continue;
        const drafts = path.join(root, 'recipes/drafts');
        fs.mkdirSync(drafts, { recursive: true });
        fs.renameSync(
          source,
          path.join(
            drafts,
            `${recipe.identity.split('/')[1]}@${recipe.version}.md`,
          ),
        );
      }
    }
  }
  fs.rmSync(path.join(root, 'records/promotions'), {
    recursive: true,
    force: true,
  });
  fs.rmSync(path.join(root, 'experiments'), { recursive: true, force: true });
  fs.mkdirSync(path.join(root, 'experiments'), { recursive: true });
}
