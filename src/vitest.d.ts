import 'vitest';
import { ExpectCustomError } from "./customMatcher/toThrowCustomError";

declare module 'vitest' {
  interface Assertion<T = any> extends ExpectCustomError<T> {}
  interface AsymmetricMatchersContaining extends ExpectCustomError {}
}
