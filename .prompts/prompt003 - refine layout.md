Refactor the following Obsidian recipe to use the current Modernist layout conventions (pure CSS, no plugins).

Apply these structural rules:

1. Phase headers must span full page width (not inside column callouts).
2. Phases are separated by `---` horizontal rules. No HTML div wrappers.
3. Inside each phase:
   - The phase header (## PHASE X — TITLE) appears first.
   - Then the two-column layout begins using native callout syntax:

     > [!col]
     >> [!col-left]
     >> ### Components
     >>
     >> (table)
     >
     >> [!col-right]
     >> ### Method
     >>
     >> (numbered steps)

4. Do not use any HTML divs (`<div class="modernist-phase">`, `<div class="phase-separator">`, etc.).
5. Maintain:
   - Metric units only
   - Scaling column in %
   - Clean whitespace
   - No deprecated column syntax (`[!columns]`, `[!column]`, `> > [!column]`)
   - No stray indentation levels

6. Do not modify frontmatter.
7. Preserve existing ingredients and method text exactly.

Output only the fully refactored markdown.
