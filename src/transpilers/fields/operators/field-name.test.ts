import { resolveFieldName } from "./field-name";
import { SqlDialect } from "../../../types";

describe("resolveFieldName", () => {
  const defaultDialect = SqlDialect.postgres;
  const fields = { 1: "id", 2: "name", 3: "date_joined", 4: "age" };

  it("gets field name based on provided fields config", () => {
    expect(resolveFieldName(["field", 3], fields, defaultDialect)).toBe(
      "date_joined"
    );
  });

  describe(`Dialect: ${SqlDialect.postgres}`, () => {
    it("strips reserved words used as column name", function () {
      const reservedNameFields = { 1: "string" };
      expect(
        resolveFieldName(["field", 1], reservedNameFields, SqlDialect.postgres)
      ).toBe('"string"');
    });
  });

  describe(`Dialect: ${SqlDialect.sqlserver}`, () => {
    it("strips reserved words used as column name", function () {
      const reservedNameFields = { 1: "string" };
      expect(
        resolveFieldName(["field", 1], reservedNameFields, SqlDialect.sqlserver)
      ).toBe('"string"');
    });
  });

  describe(`Dialect: ${SqlDialect.mysql}`, () => {
    it("handles reserved words used as column name", function () {
      const reservedNameFields = { 1: "string" };
      expect(
        resolveFieldName(["field", 1], reservedNameFields, SqlDialect.mysql)
      ).toBe("`string`");
    });

    it("handles column names with hyphens", function () {
      const specialFields = { 1: "date-joined" };
      expect(
        resolveFieldName(["field", 1], specialFields, SqlDialect.mysql)
      ).toBe("`date-joined`");
    });
  });
});
