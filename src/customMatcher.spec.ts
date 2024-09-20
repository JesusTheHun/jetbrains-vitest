import { test, expect } from 'vitest';
import { CustomError } from './CustomError.js';
import './customMatcher';

async function doStuff() {
  throw new CustomError();
}

test('has no TS error', async ({ expect }) => {
  // It should offer autocompletion for `toThrowCustomError()`
  expect(doStuff).rejects.toThrowCustomError();
});
