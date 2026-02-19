Refactor the following Obsidian recipe to use refined Modernist layout conventions with the Multi-Column Markdown plugin.

Apply these structural rules:

1. Phase headers must span full page width (not inside column callouts).
2. Each phase must be wrapped in a semantic container:
   
   <div class="modernist-phase">

3. Inside each phase:
   - The phase header (## PHASE X — TITLE) appears first.
   - A horizontal rule (---) appears directly below the header.
   - Then the two-column layout begins using:
     
     > [!columns]
     >
     > > [!column]
     > > ### Components
     > >
     > > (table)
     >
     > > [!column]
     > > ### Method
     > >
     > > (numbered steps)

4. After closing each phase container, insert a visual phase separator:

   <div class="phase-separator"></div>

5. Maintain:
   - Metric units only
   - Scaling column in %
   - Clean whitespace
   - No deprecated column syntax
   - No stray indentation levels

6. Do not modify frontmatter.
7. Preserve existing ingredients and method text exactly.

Output only the fully refactored markdown.