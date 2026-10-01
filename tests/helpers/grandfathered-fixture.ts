import fs from 'node:fs';
import path from 'node:path';

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
  fs.rmSync(path.join(root, 'records/promotions'), {
    recursive: true,
    force: true,
  });
  fs.rmSync(path.join(root, 'experiments'), { recursive: true, force: true });
  fs.mkdirSync(path.join(root, 'experiments'), { recursive: true });
}
