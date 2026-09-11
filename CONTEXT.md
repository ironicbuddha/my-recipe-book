# Modernist Recipe Book

A structured culinary knowledge system that preserves authoritative Recipes,
experimental evidence, and reusable culinary knowledge.

## Language

### Recipe lifecycle

**Recipe**:
An enduring identity for a culinary specification across all of its versions.
_Avoid_: Dish, recipe file

**Recipe Version**:
A specific revision of a Recipe. A Recipe Version is a Recipe Draft, the
Canonical Recipe, or a Superseded Recipe Version.
_Avoid_: Recipe, Experiment

**Recipe Draft**:
An unaccepted Recipe Version whose content is still being developed.
_Avoid_: Draft Recipe, Candidate Recipe

**Canonical Recipe**:
The currently accepted, authoritative Recipe Version. A newer Recipe Draft does
not displace it until Promotion.
_Avoid_: Published Recipe, Master Recipe

**Superseded Recipe Version**:
A formerly canonical Recipe Version retained as immutable, referenceable
history after Promotion.
_Avoid_: Canonical Recipe, Recipe Draft, deleted version

**Culinary Change**:
A change to ingredients, quantities, Phases, methods, controls, or endpoints
that may alter how a Recipe Version is produced or what it yields.
_Avoid_: Editorial correction, formatting change

**Promotion**:
A Curator's acceptance of a valid Recipe Draft as the new Canonical Recipe while
preserving the Recipe's identity.
_Avoid_: Merge, publish, successful Experiment

**Promotion Record**:
A durable record of a Curator's acceptance of an exact Recipe Version, naming
the supporting Completed Experiments, Curator, acceptance date, and rationale,
including known shortcomings.
_Avoid_: Experiment result, validation result, merge approval

### Experimental evidence

**Experiment**:
A bounded trial that records evidence about one primary culinary subject
without sharing that subject's identity.
_Avoid_: Recipe Version, Recipe Draft

**Completed Experiment**:
An Experiment with a recorded hypothesis, procedure, results, and decision.
Completion describes evidentiary completeness, not success.
_Avoid_: Successful Experiment, promoted Recipe

### Recipe structure

**Phase**:
An ordered unit of work within a Recipe Version. Its position expresses
dependency and intended start order; explicitly independent work may overlap.
_Avoid_: Section, Step

**Phase Output**:
A named intermediate produced by one Phase for consumption by one or more later
Phases.
_Avoid_: Ingredient, Ingredient Use, component

**Ingredient**:
A culinary material independent of any particular amount, preparation, timing,
or purpose.
_Avoid_: Ingredient Use, component

**Ingredient Use**:
One Phase-local occurrence of an Ingredient, carrying its own quantity, scaling,
preparation, timing, and purpose.
_Avoid_: Ingredient, component row

**Technique**:
An intentional, repeatable practice used to produce or control a culinary
transformation.
_Avoid_: Principle, method step

**Technique Application**:
One Phase-local use of a Technique, including the controls and purpose specific
to that use.
_Avoid_: Technique, recipe-level technique tag

**Principle**:
A causal explanation that predicts how culinary conditions influence outcomes.
_Avoid_: Technique, tip

### Knowledge curation

**Curator**:
A human responsible for accepting authoritative culinary content.
_Avoid_: Validator, generator

**Knowledge Note**:
A curated explanation of exactly one Ingredient, Technique, or Principle.
_Avoid_: Canonical Note, generated note, Recipe, Experiment

**Knowledge Candidate**:
An uncurated proposal that observed culinary material may identify an
Ingredient, Technique, or Principle.
_Avoid_: Knowledge Note, generated note

**Retired Candidate**:
A durable, non-authoritative resolution recording a rejected Knowledge
Candidate's observed name, evidence, and retirement reason.
_Avoid_: Deleted Candidate, Knowledge Note

**Curation**:
A Curator's resolution of a Knowledge Candidate by establishing new knowledge,
merging it into an existing subject, or retiring it as non-domain noise.
_Avoid_: Generation, usage threshold

**Alias**:
An alternate name that resolves to exactly one Ingredient, Technique, or
Principle without owning a separate subject identity.
_Avoid_: Subject, Knowledge Note

**Knowledge Graph**:
The culinary relationships among Recipes, Experiments, Knowledge Notes, and the
subjects they reference.
_Avoid_: Wikilink graph, website navigation

### Identity and references

**Stable Identity**:
An immutable, typed identifier for one Recipe, Experiment, Ingredient, Technique,
or Principle across changes to its name, source file, and presentation.
_Avoid_: Title, filename, public route, slug

**Culinary Reference**:
A typed relationship from canonical content to a Stable Identity or to a
locator scoped beneath an exact Recipe Version.
_Avoid_: Wikilink, filename link, website link

**Retired Identity**:
A formerly active Stable Identity that remains permanently reserved after its
subject is merged into another identity.
_Avoid_: Alias, reusable identifier, deleted identity

### Publication

**Publication Eligible**:
Content whose lifecycle state and satisfied content contract permit it to
appear on the public site.
_Avoid_: publish flag, draft status

**Public Route**:
The stable website address projected for Publication Eligible content from its
Stable Identity.
_Avoid_: Stable Identity, source path, filename

**Redirect**:
A publisher-owned mapping from a former Public Route to the surviving Stable
Identity that now owns its destination.
_Avoid_: Alias, Culinary Reference, copied content

## Relationships

### Recipe lifecycle

- A **Recipe** has at most one Canonical Recipe and may have zero or more Recipe
  Drafts and Superseded Recipe Versions
- Only a **Curator** can perform **Promotion**
- Content-contract evidence and Experiments may inform **Promotion**, but cannot
  perform it
- **Promotion** requires at least one **Completed Experiment** whose primary
  subject is the exact **Recipe Draft**
- Every future **Promotion** requires a **Promotion Record** matching the exact
  Recipe Version accepted
- **Promotion** requires complete evidence targeting the exact Recipe Draft,
  but does not require a successful experimental outcome; the **Curator** judges
  culinary acceptability and records that judgment in the **Promotion Record**
- After a **Completed Experiment** targets a Recipe Draft or an Ingredient Use
  within it, any **Culinary Change** creates a new Recipe Draft version
- A **Completed Experiment** targeting an Ingredient Use does not satisfy the
  whole-Recipe-Draft evidence requirement for **Promotion**
- Editorial corrections do not create a new **Recipe Version** or invalidate
  Experiment evidence
- **Promotion** turns the previous Canonical Recipe into a **Superseded Recipe
  Version** without changing the Recipe's identity

### Experimental evidence

- An **Experiment** has exactly one primary subject: a Recipe Version,
  Technique, Principle, or Ingredient Use
- An **Experiment** receives its Stable Identity when created and retains it
  when it becomes a **Completed Experiment**
- A repeat trial is a new **Experiment** with its own Stable Identity
- A **Completed Experiment's** primary-subject reference is immutable: it
  identifies an exact Recipe Version, an Ingredient Use within an exact Recipe
  Version and Phase, or a Technique or Principle by its Stable Identity
- An **Experiment's** procedure records the actual conditions tested; its
  primary-subject reference does not follow the current Canonical Recipe
- A **Completed Experiment's** hypothesis, procedure, results, and decision are
  immutable
- Editorial corrections may update a **Completed Experiment**; new or corrected
  evidence requires a new Experiment
- An **Experiment** that corrects earlier evidence explicitly references the
  Experiment it corrects; an ordinary repeat trial does not imply a correction
- A correcting **Experiment** and the Experiment it corrects retain their own
  Stable Identities and evidence records
- A published correction produces a derived notice on the original
  **Completed Experiment** linking to the correcting Experiment
- A **Completed Experiment** preserves its historical primary-subject reference
  when the target identity is later retired; the retirement record retains
  resolution of that identity and identifies its survivor
- New **Experiments** must reference the surviving identity after a merge

### Recipe structure

- A **Recipe Version** comprises one or more dependency-ordered **Phases**
- Independent **Phases** may overlap when the Recipe Version makes that
  concurrency explicit
- A **Phase Output** is produced by exactly one **Phase** and may be consumed by
  one or more later Phases
- A **Phase Output** is neither an Ingredient nor an **Ingredient Use**
- An **Ingredient Use** belongs to exactly one **Phase** and references exactly
  one **Ingredient**
- The same **Ingredient** may have separate **Ingredient Uses** within or across
  Phases
- A **Technique Application** belongs to exactly one **Phase** and references
  exactly one **Technique**
- The same **Technique** may have separate **Technique Applications** within or
  across Phases
- A Recipe Version's Techniques are exactly those referenced by its **Technique
  Applications**
- A culinary concept cannot share one identity as both a **Technique** and a
  **Principle**
- A **Technique** may be explained by many **Principles**, and a **Principle**
  may explain many Techniques
- A **Principle** may explain the transformations or outcomes of many
  **Phases**, and a Phase may be explained by many Principles
- A Recipe Version's Principles are exactly those that explain its Phases

### Knowledge curation

- A **Knowledge Note** curates exactly one Ingredient, Technique, or Principle
- Each Ingredient, Technique, or Principle has at most one **Knowledge Note**
- A **Knowledge Candidate** is neither authoritative nor **Publication
  Eligible**
- A **Retired Candidate** is neither authoritative nor **Publication Eligible**
- Only a **Curator** can perform **Curation**
- **Curation** resolves a Knowledge Candidate by creating a subject and
  Knowledge Note, merging it into an existing subject as an alias, or retiring
  it
- Generation and usage frequency may inform **Curation**, but cannot perform it
- Recurrence of the same observed evidence does not reopen a **Retired
  Candidate**
- An **Alias** resolves to exactly one Ingredient, Technique, or Principle
- An **Alias** owns neither a subject identity nor a **Knowledge Note**
- Recipe Versions and Experiments are not **Knowledge Notes**
- Generated indexes and backlinks are not **Knowledge Notes**

### Identity and references

- Every **Recipe**, **Experiment**, **Ingredient**, **Technique**, and
  **Principle** has exactly one **Stable Identity**
- A **Knowledge Note** uses the Stable Identity of the subject it curates and
  does not own a separate note identity
- A **Stable Identity** is independent of names, Aliases, source filenames,
  folder paths, Public Routes, and presentation technology
- A Recipe Version is located by its Recipe's Stable Identity and version
  number
- A Phase is located within one exact Recipe Version by its Phase code
- A Phase Output is located within one exact Recipe Version by a stable local
  key
- An Ingredient Use is located within one Phase by a stable local key
- A **Culinary Reference** resolves to exactly one existing target of the
  declared type; an unresolved, ambiguous, or type-mismatched target is invalid
  in authoritative content. A retired target is invalid except for a
  **Completed Experiment's** preserved historical primary-subject reference
- The readable label of a Culinary Reference does not determine its target
- The semantic structure that owns a Culinary Reference determines the
  relationship; a reference in ordinary prose is only a navigational mention
- Canonical content authors each relationship once; reverse relationships,
  indexes, and backlinks are derived
- A resolved Culinary Reference to content that is not Publication Eligible
  remains part of the Knowledge Graph but does not create a public link
- A **Retired Identity** cannot be reused or targeted by current canonical
  content except for a **Completed Experiment's** preserved historical
  primary-subject reference; other current references migrate to its surviving
  identity

### Publication

- A **Recipe Draft** is never **Publication Eligible**
- A **Canonical Recipe** that satisfies its content contract is **Publication
  Eligible**
- A **Superseded Recipe Version** is not **Publication Eligible**
- Only a **Completed Experiment** that satisfies its content contract is
  **Publication Eligible**
- A **Completed Experiment's** Public Route derives from the Stable Identity
  it received when created
- A **Completed Experiment** may be Publication Eligible when its primary
  subject is a **Recipe Draft**; this does not make the draft Publication
  Eligible or give it a Public Route
- A published **Completed Experiment** identifies an unpublished primary
  subject as plain text with its exact version and local scope where applicable;
  the Experiment's own recorded procedure and results provide the tested context
- A **Knowledge Note** is **Publication Eligible** only when it contains curated
  substance and satisfies its content contract
- **Publication Eligible** content is published automatically without a
  separate publication decision
- A **Public Route** is derived from Stable Identity rather than authored in
  canonical content
- Renaming content does not change its Stable Identity or Public Route
- An Alias supports curation, recognition, and search but creates neither a
  Stable Identity nor a Public Route
- A Recipe's Public Route presents its current Canonical Recipe; exact Recipe
  Versions do not receive automatic public archive routes
- A **Redirect** is explicit, permanent, and one hop; it cannot form a cycle or
  collide with an active Public Route
