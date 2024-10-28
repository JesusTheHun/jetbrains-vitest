import { expect } from 'vitest';
import { CustomError } from './CustomError';

expect.extend({
  toThrowCustomError(received) {
    const { isNot, promise } = this;

    const failure = {
      message: () =>
        `expected "${received}" ${isNot ? 'to not be' : 'to be'} a CustomError`,
      pass: false,
    };

    if (promise !== 'rejects') {
      return {
        message: () =>
          `expected promise ${
            isNot ? 'to not throw' : 'to throw'
          } a CustomError, but resolved instead`,
        pass: false,
      };
    }

    if (!(received instanceof CustomError)) {
      return failure;
    }

    return {
      message: () => `CustomError`,
      pass: true,
    };
  },
});

export interface ExpectCustomError<R = unknown> {
  toThrowCustomError(): R;
}
