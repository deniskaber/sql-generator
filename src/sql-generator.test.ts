import { generateSql } from "./sql-generator";
import { SqlDialectUnion, SqlQueryParameters } from "./types";
import { SqlQueryFields } from "./transpilers/fields/types";

const fields = { 1: "id", 2: "name", 3: "date_joined", 4: "age" };
const requiredTestCases: {
  args: [SqlDialectUnion, SqlQueryFields, SqlQueryParameters];
  result: string;
}[] = [
  {
    args: ["postgres", fields, { where: ["=", ["field", 3], null] }],
    result: "SELECT * FROM data WHERE date_joined IS NULL",
  },
  {
    args: ["postgres", fields, { where: [">", ["field", 4], 35] }],
    result: "SELECT * FROM data WHERE age > 35",
  },
  {
    args: [
      "postgres",
      fields,
      { where: ["and", ["<", ["field", 1], 5], ["=", ["field", 2], "joe"]] },
    ],
    result: "SELECT * FROM data WHERE id < 5 AND name = 'joe'",
  },
  {
    args: [
      "sqlserver",
      fields,
      {
        where: [
          "or",
          ["!=", ["field", 3], "2015-11-01"],
          ["=", ["field", 1], 456],
        ],
      },
    ],
    result: "SELECT * FROM data WHERE date_joined <> '2015-11-01' OR id = 456",
  },
  {
    args: [
      "postgres",
      fields,
      {
        where: [
          "and",
          ["!=", ["field", 3], null],
          ["or", [">", ["field", 4], 25], ["=", ["field", 2], "Jerry"]],
        ],
      },
    ],
    result:
      "SELECT * FROM data WHERE date_joined IS NOT NULL AND (age > 25 OR name = 'Jerry')",
  },
  {
    args: ["postgres", fields, { where: ["=", ["field", 4], 25, 26, 27] }],
    result: "SELECT * FROM data WHERE age IN (25, 26, 27)",
  },
  {
    args: ["postgres", fields, { where: ["=", ["field", 2], "cam"] }],
    result: "SELECT * FROM data WHERE name = 'cam'",
  },
  {
    args: [
      "mysql",
      fields,
      {
        where: ["=", ["field", 2], "cam"],
        limit: 10,
      },
    ],
    result: "SELECT * FROM data WHERE name = 'cam' LIMIT 10",
  },
  {
    args: ["postgres", fields, { limit: 20 }],
    result: "SELECT * FROM data LIMIT 20",
  },
  {
    args: ["sqlserver", fields, { limit: 20 }],
    result: "SELECT TOP 20 * FROM data",
  },
];
describe("generateSql", () => {
  it.each(requiredTestCases)(
    "pass a required test case: $result",
    ({ args, result }) => {
      expect(generateSql(...args)).toBe(result);
    }
  );
});
