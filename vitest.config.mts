import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./setupTests.ts'],
    include: ['**/*.spec.ts'],
    disableConsoleIntercept: true,
  },
});
