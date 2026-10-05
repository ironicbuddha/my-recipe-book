import MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token.mjs';
import { phaseHeadingId, renderContent, type CulinaryLibrary } from './library';

export type IngredientUse = {
  key: string;
  labelHtml: string;
  quantity: string;
  scaling: string;
  noteHtml: string;
};
export type PreparationPhase = {
  id: string;
  title: string;
  preludeHtml: string;
  ingredients: IngredientUse[];
  ingredientNotesHtml: string;
  methodHtml: string;
  methodStart: number;
  stepCount: number;
  supportingHtml: string;
};
export type RecipePresentation = {
  overviewHtml: string;
  phases: PreparationPhase[];
  endingHtml: string;
};

/** Projects validated Markdown; source Phases remain the only grouping authority. */
export function projectRecipe(
  body: string,
  library: CulinaryLibrary,
): RecipePresentation {
  const parser = new MarkdownIt();
  const tokens = parser.parse(body, {});
  const lines = body.split('\n');
  const source = (from: number, to: number) => lines.slice(from, to).join('\n');
  const render = (markdown: string) =>
    renderContent(markdown, library, { tableLabels: true });
  const inline = (markdown: string) =>
    renderContent(markdown, library, { inline: true });
  const headings = tokens.flatMap((token, index) =>
    token.type === 'heading_open' && token.tag === 'h2' && token.map
      ? [
          {
            title: tokens[index + 1]?.content ?? '',
            from: token.map[0],
            to: token.map[1],
          },
        ]
      : [],
  );
  const phases: PreparationPhase[] = [];
  let nextStep = 1;
  let endingFrom = lines.length;
  for (const [index, heading] of headings.entries()) {
    if (!/^PHASE [A-Z]+ — .+$/u.test(heading.title)) {
      endingFrom = Math.min(endingFrom, heading.from);
      continue;
    }
    const end = headings[index + 1]?.from ?? lines.length;
    const phaseTokens = parser.parse(source(heading.to, end), {});
    const phaseLines = lines.slice(heading.to, end);
    const sectionSource = (from: number, to: number) =>
      phaseLines.slice(from, to).join('\n');
    const sections = phaseTokens.flatMap((token, tokenIndex) =>
      token.type === 'heading_open' && token.tag === 'h3' && token.map
        ? [
            {
              title: phaseTokens[tokenIndex + 1]?.content ?? '',
              from: token.map[0],
              to: token.map[1],
            },
          ]
        : [],
    );
    const phase: PreparationPhase = {
      id: phaseHeadingId(heading.title),
      title: heading.title,
      preludeHtml: render(
        sectionSource(0, sections[0]?.from ?? phaseLines.length),
      ),
      ingredients: [],
      ingredientNotesHtml: '',
      methodHtml: '',
      methodStart: nextStep,
      stepCount: 0,
      supportingHtml: '',
    };
    for (const [sectionIndex, section] of sections.entries()) {
      const sectionEnd = sections[sectionIndex + 1]?.from ?? phaseLines.length;
      const markdown = sectionSource(section.to, sectionEnd);
      const sectionTokens = parser.parse(markdown, {});
      if (section.title === 'Ingredient Uses') {
        const tableStart = sectionTokens.findIndex(
          (token) => token.type === 'table_open',
        );
        const tableEnd = sectionTokens.findIndex(
          (token) => token.type === 'table_close',
        );
        // Fail visibly rather than discard an unexpected validated serialization.
        if (tableStart < 0 || tableEnd < 0)
          throw new Error(`Missing Ingredient Uses table: ${heading.title}`);
        phase.ingredients = tableRows(
          sectionTokens.slice(tableStart, tableEnd),
        ).map((cells) => ({
          key: cells[0] ?? '',
          labelHtml: inline(cells[1] ?? ''),
          quantity: cells[2] ?? '',
          scaling: cells[3] ?? '',
          noteHtml: inline(
            ingredientNote(cells[1] ?? '', cells[4] ?? '', parser),
          ),
        }));
        const start = sectionTokens[tableStart]?.map?.[0] ?? 0;
        const finish = sectionTokens[tableStart]?.map?.[1] ?? 0;
        const sectionLines = markdown.split('\n');
        phase.ingredientNotesHtml = render(
          [...sectionLines.slice(0, start), ...sectionLines.slice(finish)].join(
            '\n',
          ),
        );
      } else if (section.title === 'Method') {
        let inOrderedList = false;
        for (const token of sectionTokens) {
          if (token.type === 'ordered_list_open' && token.level === 0)
            inOrderedList = true;
          if (token.type === 'ordered_list_close' && token.level === 0)
            inOrderedList = false;
          if (
            inOrderedList &&
            token.type === 'list_item_open' &&
            token.level === 1
          )
            phase.stepCount += 1;
        }
        phase.methodHtml = renderContent(markdown, library, {
          methodStart: nextStep,
          tableLabels: true,
        });
        nextStep += phase.stepCount;
      } else {
        // Includes outputs, controls, principles and any additional authored subsection.
        phase.supportingHtml += render(sectionSource(section.from, sectionEnd));
      }
    }
    phases.push(phase);
  }
  return {
    overviewHtml: render(source(0, headings[0]?.from ?? lines.length)),
    phases,
    endingHtml: render(source(endingFrom, lines.length)),
  };
}

/** Omit plain-name echoes; retain preparation instructions and rich-text references. */
function ingredientNote(
  label: string,
  note: string,
  parser: MarkdownIt,
): string {
  const labelText =
    parser
      .parseInline(label, {})[0]
      ?.children?.map((token) => token.content)
      .join('') ?? '';
  const normalize = (value: string) =>
    value.trim().replace(/\.$/u, '').replace(/\s+/gu, ' ').toLowerCase();
  return normalize(note) === normalize(labelText) ? '' : note;
}

function tableRows(tokens: Token[]): string[][] {
  const rows: string[][] = [];
  let inBody = false;
  let row: string[] = [];
  for (const token of tokens) {
    if (token.type === 'tbody_open') inBody = true;
    if (!inBody) continue;
    if (token.type === 'tr_open') row = [];
    if (token.type === 'inline') row.push(token.content);
    if (token.type === 'tr_close') rows.push(row);
  }
  return rows;
}
