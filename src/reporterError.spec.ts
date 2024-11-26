import { CustomError } from "./customMatcher/CustomError";
import { describe, it } from "vitest";

/**
 * Run this suite using the Vitest run configuration of the IDE.
 * Make sure the output of the test matches the following expectations :
 */
describe('JetBrains IDE should display the properties of the Error thrown', () => {
  it('should display the `message` property', () => {
    throw new CustomError({
      message: 'Something went wrong',
    })
  });

  it('should display the `cause` property', () => {
    throw new CustomError({
      cause: 'trying to divide by zero',
    })
  });

  it('should display the custom property `code`', () => {
    throw new CustomError({
      code: 666,
    })
  });

  it('should display all the properties of the error', () => {
    throw new CustomError({
      message: 'Something went wrong',
      cause: 'trying to divide by zero',
      code: 666,
    })
  })
});