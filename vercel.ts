import {
  publisherRedirects,
  retirementRedirects,
  withdrawalRoutes,
} from './src/lib/library.ts';

export const config = {
  buildCommand: 'pnpm release:verify',
  outputDirectory: 'dist',
  redirects: [
    ...Object.entries({
      ...publisherRedirects(),
      ...retirementRedirects(),
    }).map(([source, redirect]) => ({
      destination: redirect.destination,
      source,
      statusCode: 301,
    })),
  ],
  routes: withdrawalRoutes().map((source) => ({
    dest: '/withdrawn-recipe/',
    src: source,
    status: 410,
  })),
};
