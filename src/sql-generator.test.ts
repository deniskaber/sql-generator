import { generateSql } from "./sql-generator";

describe("generateSql", () => {
  const fields = { 1: "id", 2: "name", 3: "date_joined", 4: "age" };

  it("handles required cases", () => {
    expect(
      generateSql("postgres", fields, {
        where: ["=", ["field", 3], null],
      })
    ).toBe("SELECT * FROM data WHERE date_joined IS NULL");

    expect(
      generateSql("postgres", fields, { where: [">", ["field", 4], 35] })
    ).toBe("SELECT * FROM data WHERE age > 35");
  });
});
