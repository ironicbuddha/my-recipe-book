import { ContentValidationError, loadLibrary } from '../src/lib/library';

try {
  const library = loadLibrary();
  console.log(`Validation passed: ${library.recipes.length} recipe(s), ${library.knowledge.length} Knowledge Note(s).`);
} catch (error) {
  if (error instanceof ContentValidationError) {
    console.error(error.message);
    process.exitCode = 1;
  } else {
    throw error;
  }
}
