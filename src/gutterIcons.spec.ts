/**
 * This file aims to provide an exhaustive list of all possible syntax to declare a test with vitest.
 * You will find additional cases in the file `./extendedTests.spec.ts`.
 */

import { describe, expect, it } from 'vitest';


/**
 * When vitest starts, it first collects all the tests.
 * To do that, it reads all the tests files that match the CLI argument, if any.
 * 
 * Functions like `describe` or `suite` are collector functions.
 * Meaning they themselves contain collector functions or tests.
 * 
 * Because the function `notTestCollector` is not a collector function, the call to the test function `it` will
 * never be reached by vitest and therefore the test cannot be executed.
 */
const notTestCollector = () => {
  it('should not display gutter icon', ({ expect }) => {
    expect.fail('never collected');
  });
};

const suiteFn = () => {
  it('should run', () => {
    expect(true).toBe(true);
  });
};
const testFn = () => {
  expect(true).toBe(true);
};
const opts = { timeout: 5_000 };
const condition = true;
const cases: unknown[] = [];

describe('JetBrains IDE should display gutter icons for native collectors', () => {
  // Note that I did NOT include the `skipIf`, as it is expected to behave the same as `runIf`
  describe('describe, fn', suiteFn);
  describe.only('describe.only, fn', suiteFn);
  describe.only('describe.only, fn, opts', suiteFn, opts);
  describe.only.each(cases)('describe.only.each, fn', suiteFn);
  describe.only.each(cases)('describe.only.each, fn, opts', suiteFn, opts);
  describe.only.skip('describe.only.skip, fn', suiteFn);
  describe.only.skip('describe.only.skip, fn, opts', suiteFn, opts);
  describe.skip('describe.skip, fn', suiteFn);
  describe.skip('describe.skip, fn, opts', suiteFn, opts);
  describe.runIf(condition)('describe.runIf, fn', suiteFn);
  describe.runIf(condition)('describe.runIf, fn, opts', suiteFn, opts);
  describe.runIf(condition).each(cases)('describe.runIf.each, fn', suiteFn);
  describe.runIf(condition).each([])('describe.runIf.each, fn, opts', suiteFn, opts);
  describe.runIf(condition).only('describe.runIf.only, fn', suiteFn);
  describe.runIf(condition).only('describe.runIf.only, fn, opts', suiteFn, opts);
  describe.sequential('describe.sequential, fn', suiteFn);
  describe.sequential.skip('describe.sequential.skip, fn', suiteFn);
  describe.concurrent('describe.concurrent, fn', suiteFn);
  describe.shuffle('describe.shuffle, fn', suiteFn);
  describe.todo('describe.todo, fn', suiteFn);
});

describe('JetBrains IDE should display gutter icons for native task functions', () => {
  // Note that I did NOT include the `skipIf`, as it is expected to behave the same as `runIf`

  it('it, fn', testFn);
  it.todo('it.todo, fn', testFn);
  it.todo.skip('it.todo.skip, fn', testFn);
  it.only('it.only, fn', testFn);
  it.only('it.only, fn, opts', testFn, opts);
  it.only.each(cases)('it.only.each, fn', testFn);
  it.only.each(cases)('it.only.each, fn, opts', testFn, opts);
  it.only.skip.each(cases)('it.only.skip.each, fn', testFn);
  it.only.skip.each(cases)('it.only.skip.each, fn, opts', testFn, opts);
  it.only.skip('it.only.skip, fn', testFn);
  it.only.skip('it.only.skip, fn, opts', testFn, opts);
  it.skip('it.skip, fn', testFn);
  it.skip('it.skip, fn, opts', testFn, opts);
  it.runIf(condition)('it.runIf, fn', testFn);
  it.runIf(condition)('it.runIf, fn, opts', testFn, opts);
  it.runIf(condition).each(cases)('it.runIf.each, fn', testFn);
  it.runIf(condition).each([])('it.runIf.each, fn, opts', testFn, opts);
  it.runIf(condition).only('it.runIf.only, fn', testFn);
  it.runIf(condition).only('it.runIf.only, fn, opts', testFn, opts);
  it.runIf(condition).todo('it.runIf.todo, fn', testFn);
  it.runIf(condition).todo('it.runIf.todo, fn, opts', testFn, opts);
});
