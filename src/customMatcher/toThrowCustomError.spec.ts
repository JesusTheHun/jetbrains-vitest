import { jetbrainTest } from "./jetbrainTest";
import { test } from 'vitest';
import { CustomError } from './CustomError.js';

/**
 * The custom matcher is imported in src/setupTests.ts
 */

async function doStuff() {
  throw new CustomError();
}

test('has no TS error', async ({ expect }) => {
  // It should offer autocompletion for `toThrowCustomError()`
  expect(doStuff).rejects.toThrowCustomError();
});


jetbrainTest('should offer autocompletion for toThrowCustomError', async ({ expect }) => {
  expect(doStuff).rejects.toThrowCustomError();
})

// TODO is aliases in tsconfig & vitest.config.mts