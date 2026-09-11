import { ContentValidationError, loadLibrary } from '../src/lib/library';

try {
  const library = loadLibrary();
  const experiments = library.entries.filter(
    (entry) => entry.type === 'experiment',
  ).length;
  console.log(
    `Validation passed: ${library.recipes.length} recipe(s), ${library.knowledge.length} Knowledge Note(s), ${experiments} Completed Experiment(s).`,
  );
} catch (error) {
  if (error instanceof ContentValidationError) {
    console.error(error.message);
    process.exitCode = 1;
  } else {
    throw error;
  }
}
