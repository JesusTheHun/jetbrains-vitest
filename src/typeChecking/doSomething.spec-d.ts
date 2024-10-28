import { doSomething } from "./doSomething";
import { describe, it, expectTypeOf } from 'vitest';

describe('doSomething', () => {
  it('should return a string', () => {
    expectTypeOf(doSomething()).toMatchTypeOf<string>();
  });
});
