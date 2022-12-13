import { getFieldOrValueSqlGenerator } from "./field-values-transpiler";
import { SqlDialect } from "../../types";
import * as fieldNameResolvers from "./operators/field-name";

jest.mock("./operators/field-name");

describe("getFieldOrValueSql", () => {
  const fields = { 1: "id", 2: "name", 3: "date_joined", 4: "age" };
  const defaultDialect = SqlDialect.postgres;

  const getFieldOrValueSql = getFieldOrValueSqlGenerator(
    defaultDialect,
    fields
  );

  it("handles a number", () => {
    expect(getFieldOrValueSql(2)).toBe("2");
  });

  it("handles a string", () => {
    expect(getFieldOrValueSql("test")).toBe("'test'");
  });

  it("uses specific handler in case of a field descriptor", () => {
    const resolveFieldNameSpy = jest
      .spyOn(fieldNameResolvers, "resolveFieldName")
      .mockImplementationOnce(() => "field_3");

    expect(getFieldOrValueSql(["field", 3])).toBe("field_3");
    expect(resolveFieldNameSpy).toHaveBeenCalledTimes(1);
  });
});
