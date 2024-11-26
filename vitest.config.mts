import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./src/setupTests.ts'],
    include: ['**/*.spec.ts'],
    disableConsoleIntercept: true,
  },
});
