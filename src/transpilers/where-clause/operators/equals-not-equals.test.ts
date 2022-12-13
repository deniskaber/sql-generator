import { transpileEqualsNotEqualsOperator } from "./equals-not-equals";
import { createGetFieldOrValueSqlMock } from "../../../test_utils/mocks";
import { SqlDialect } from "../../../types";

describe('"=" operator', () => {
  const getFieldOrValueSqlMock = createGetFieldOrValueSqlMock();
  const defaultDialect = SqlDialect.postgres;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates "field = value" for config with 2 arguments', () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["=", ["field", 3], 5],
        getFieldOrValueSqlMock,
        defaultDialect
      )
    ).toBe("field_3 = 5");
  });

  it('generates "field IN (value1, value2)" for config with 3 arguments', () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["=", ["field", 3], 5, 6],
        getFieldOrValueSqlMock,
        defaultDialect
      )
    ).toBe("field_3 IN (5, 6)");
  });

  it("handles many arguments correctly", () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["=", ["field", 3], 5, 6, "abc", 10, "test"],
        getFieldOrValueSqlMock,
        defaultDialect
      )
    ).toBe("field_3 IN (5, 6, 'abc', 10, 'test')");
  });

  it(`calls "getFieldOrValueSql" to process field value`, () => {
    transpileEqualsNotEqualsOperator(
      ["=", ["field", 3], 5, "abc"],
      getFieldOrValueSqlMock,
      defaultDialect
    );

    expect(getFieldOrValueSqlMock).toHaveBeenCalledTimes(3);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(1, ["field", 3]);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(2, 5);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(3, "abc");
  });
});

describe('"!=" operator', () => {
  const getFieldOrValueSqlMock = createGetFieldOrValueSqlMock();
  const defaultDialect = SqlDialect.postgres;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates "field != value" for config with 2 arguments', () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["!=", ["field", 3], 5],
        getFieldOrValueSqlMock,
        defaultDialect
      )
    ).toBe("field_3 != 5");
  });

  it('generates "field NOT IN (value1, value2)" for config with 3 arguments', () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["!=", ["field", 3], 5, 6],
        getFieldOrValueSqlMock,
        defaultDialect
      )
    ).toBe("field_3 NOT IN (5, 6)");
  });

  it("handles many arguments correctly", () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["!=", ["field", 3], 5, 6, "abc", 10, "test"],
        getFieldOrValueSqlMock,
        defaultDialect
      )
    ).toBe("field_3 NOT IN (5, 6, 'abc', 10, 'test')");
  });

  it(`calls "getFieldOrValueSql" to process field value`, () => {
    transpileEqualsNotEqualsOperator(
      ["!=", ["field", 3], 5, "abc"],
      getFieldOrValueSqlMock,
      defaultDialect
    );

    expect(getFieldOrValueSqlMock).toHaveBeenCalledTimes(3);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(1, ["field", 3]);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(2, 5);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(3, "abc");
  });

  describe("Dialect: sqlserver", () => {
    it('returns "<>" when 2 arguments passed', function () {
      expect(
        transpileEqualsNotEqualsOperator(
          ["!=", ["field", 3], 5],
          getFieldOrValueSqlMock,
          SqlDialect.sqlserver
        )
      ).toBe("field_3 <> 5");
    });
  });
});
