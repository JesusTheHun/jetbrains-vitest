import { bench, describe, expect, it } from "vitest";

const fn = () => {
  expect(true).toBe(true);
};

const condition = true;

describe('JetBrains IDE should display gutter icons for benchmark functions', () => {
  const benchOpts = { warmupIterations: 10 };
  bench('bench, fn', fn);
  bench('bench, fn, opts', fn, benchOpts);

  bench.skip('bench.skip, fn', fn);
  bench.skip('bench.skip, fn, opts', fn, benchOpts);

  bench.only('bench.only, fn', fn);
  bench.only('bench.only, fn, opts', fn, benchOpts);

  bench.only.skip('bench.only.skip, fn', fn);
  bench.only.skip('bench.only.skip, fn, opts', fn, benchOpts);

  bench.runIf(condition).only('bench.runIf.only, fn', fn);
  bench.runIf(condition).only('bench.runIf.only, fn, opts', fn, benchOpts);

  bench.todo('bench.todo, fn', fn);
  bench.todo('bench.todo, fn, opts', fn, benchOpts);
});