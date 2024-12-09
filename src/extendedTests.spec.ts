import { describe, it } from "vitest";

/**
 * This file contains cases regarding test extension.
 * If you need some value to be accessible in a large number of tests, you can
 * decide to extend a test :
 * 
 * const myTest = it.extend({
 *   foo: 'bar'
 * });
 * 
 * In the example above, we have define a fixture named `foo`.
 * Now you can use `myTest` to declare a test that will automatically include your fixtures :
 * 
 * myTest('my test', ({ foo }) => {...})
 * 
 * As you can see below, when you name your extended tests 'test' or 'it', the gutter icon shows up, but it doesn't
 * when you name it something else.
 * 
 * You can also create a new test function based on the built-in one if you require some advanced custom logic.
 * They will be used the same way as a regular test.
 * 
 * @see https://vitest.dev/api/#test-extended
 */

describe('JetBrains IDE should support of vitest extended tests', () => {
  describe('extended test is named like a vitest function', () => {
    const test = it.extend({
      foo: 'bar'
    });

    test('a gutter icon should be displayed', ({ expect, foo }) => {
      expect(foo).toEqual('bar');
    });
  });

  describe('extended test has a custom name', () => {
    const extendedTest = it.extend({ foo: 'bar' });

    extendedTest('a gutter icon should be displayed', ({ expect }) => {
      expect(true).toBe(true);
    });
  });

  describe('extended test has been created by a function', async () => {
    // Setup, scroll to the bottom
    class DbConnection {
      get(id: unknown): Promise<{ id: unknown; title: string; }> {
        return Promise.resolve({ id, title: 'test' });
      }
      close(): Promise<void> {
        return Promise.resolve();
      }
    }

    function getDbConnection(): Promise<DbConnection> {
      return Promise.resolve(new DbConnection());
    }

    async function createDbTest<T extends Record<string, any>>(
      suiteFixtures: (args: { db: DbConnection }) => Promise<T>
    ) {
      const fixtures = await suiteFixtures({
        db: await getDbConnection(),
      });

      const dbTest = it.extend<{ db: DbConnection }>({
        db: async ({ task }, use) => {
          const conn = await getDbConnection();
          await use(conn);
          await conn.close();
        },
      });

      return dbTest.extend<T>(fixtures);
    }

    const testWithDb = await createDbTest(async ({ db }) => {
      return {
        data: await db.get('test data'),
      };
    });

    // >> STOP <<
    // it's here
    testWithDb('should display gutter icons', ({ expect, db, data }) => {
      expect(db).toBeDefined();
      expect(data).toEqual({ id: 'test data', title: 'test' });
    });
  });
});

// EDIT
// You can also create your own custom task function, as documented here : https://vitest.dev/advanced/runner.html#your-task-function

// export const myCustomTask = createTaskCollector(
//   function (name, fn, timeout) {
//     getCurrentSuite().task(name, {
//       ...this,
//       meta: {
//         customPropertyToDifferentiateTask: true
//       },
//       handler: fn,
//       timeout,
//     })
//   }
// )
//
// // or
//
// const myCustomTask = createChainable(
//   ['concurrent', 'sequential', 'shuffle', 'skip', 'only', 'todo'],
//   function (name: string, fn: () => void) {
//     getCurrentSuite().task(name, {
//       ...this,
//       handler: fn,
//     });
//   }
// );

// In both cases, the task extends the `ChainableFunction` type.