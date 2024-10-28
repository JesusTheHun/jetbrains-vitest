import { describe, it } from "vitest";

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