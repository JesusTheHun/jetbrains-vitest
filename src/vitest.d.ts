import 'vitest';

import type { ExpectCustomError } from './customMatcher.js';

declare module 'vitest' {
  interface Assertion<T = any> extends ExpectCustomError<T> {}
  interface AsymmetricMatchersContaining extends ExpectCustomError {}
}
