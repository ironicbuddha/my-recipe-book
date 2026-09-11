# Keep Recipe Promotion Human-Controlled and Evidence-Backed

A Recipe Draft becomes the Canonical Recipe only through explicit Curator
acceptance and only when at least one Completed Experiment targets that exact
draft version. Validation and experimental outcomes inform Promotion but cannot
perform it, preserving human judgment and binding canonical authority to
reproducible evidence despite the added workflow cost. Existing Canonical
Recipes may be grandfathered during migration; every future Promotion must meet
the evidence gate.

Every future Promotion requires a durable Promotion Record stored in the
repository alongside the content. It identifies the exact Recipe identity and
version accepted, the supporting Completed Experiments, the accepting Curator,
the acceptance date, and a short rationale explaining why the evidence supports
acceptance, including known shortcomings. Missing acceptance or acceptance for
a different Recipe Version blocks admission to `recipes/`. An Experiment's
existence alone does not establish the Curator's acceptance.

Evidence completeness and exact targeting are hard Promotion gates. Missing
evidence, an incomplete Experiment, or an Experiment targeting another version
cannot satisfy the required evidence gate. A successful experimental outcome is
not required: the Curator judges culinary acceptability and explains in the
Promotion Record why the recorded evidence supports acceptance. A failed
hypothesis may still provide evidence for an acceptable Recipe.

## Migration grandfathering

A one-time, Curator-approved list identifies the exact existing Recipe Versions
allowed to remain canonical without historical Experiment evidence or a
historical Promotion Record. Each listed version must still satisfy the new
content and reference contracts. The exception does not carry forward to a new
Recipe Version: every subsequent Promotion requires the full evidence and
acceptance gates. This preserves existing accepted Recipes without inventing
historical evidence or creating a permanent exemption.

## Publication enforcement

Invalid canonical content blocks the entire new publication; the publisher must
not silently omit the affected Recipe. The last successful site remains live.
Blocking failures include invalid required structure, broken Culinary References,
and missing required Promotion evidence. Diagnostics identify the source file,
location, and violated rule. This preserves the automatic-publication boundary
and avoids silently removing content or breaking incoming links.

Provable violations of the agreed content contract are hard failures, including
missing required fields, invalid units, inconsistent scaling, invalid Phase
dependencies or references, and missing required acceptance or evidence.
Warnings flag possible editorial or culinary concerns requiring judgment, such
as suspicious quantities or potentially unclear wording, and missing optional
presentation assets such as a hero image. Warnings do not block publication and
must never downgrade a known contract violation. Human review remains
responsible for culinary meaning that validation cannot reliably establish.

Numeric Ingredient Use scaling percentages use exactly two decimal places,
including trailing zeros, such as `1.00%` and `100.00%`. Calculate each percentage
from its authored mass divided by the Recipe's declared basis mass, multiplied
by 100, and round to two decimal places with halfway values rounded up. For
example, `250 g` against a `1600 g` basis yields `15.63%`. A different rounded
value or a numeric Scaling entry without exactly two decimal places violates
the contract. The existing non-numeric `—` exception for discretionary or
non-mass Uses remains applicable.

Every required validator, typecheck, build, and publication-integrity check must
complete successfully before a new publication can replace the live site. A
failed, crashed, unavailable, or skipped required check blocks publication;
absence of a result is not evidence of validity. Optional work such as
hero-image generation may fail with a warning only when the site still renders
correctly without its output.

Incomplete Recipe Drafts and Knowledge Candidates do not by themselves block
publication. Anything required to validate authoritative content must remain
valid and resolvable, including unpublished targets of authoritative Culinary
References. An unfinished method in an unrelated draft is permitted; a missing
exact Recipe Version targeted by a published Completed Experiment blocks
publication. Checks must distinguish working-content incompleteness from
defects that invalidate authoritative content or its references.

These publication gates apply to Canonical Recipes, Completed Experiments, and
Knowledge Notes. Invalid authoritative content in any of the three categories
blocks the entire new publication. Canonical Recipes require valid Recipe
structure and Promotion evidence and acceptance, subject to the explicit
grandfathering exception. Completed Experiments require complete evidence, a
valid exact subject reference, and preserved historical evidence. Knowledge
Notes require human-curated substance about exactly one Ingredient, Technique,
or Principle, with valid identity and references. Generated placeholders remain
Knowledge Candidates; passing structural checks alone cannot make them
Knowledge Notes.
