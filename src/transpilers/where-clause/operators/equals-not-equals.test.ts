import { transpileEqualsNotEqualsOperator } from "./equals-not-equals";
import { createGetFieldOrValueSqlMock } from "../../../test_utils/mocks";

describe('"=" operator', () => {
  const getFieldOrValueSqlMock = createGetFieldOrValueSqlMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates "field = value" for config with 2 arguments', () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["=", ["field", 3], 5],
        getFieldOrValueSqlMock
      )
    ).toBe("field_3 = 5");
  });

  it('generates "field IN (value1, value2)" for config with 3 arguments', () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["=", ["field", 3], 5, 6],
        getFieldOrValueSqlMock
      )
    ).toBe("field_3 IN (5, 6)");
  });

  it("handles many arguments correctly", () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["=", ["field", 3], 5, 6, "abc", 10, "test"],
        getFieldOrValueSqlMock
      )
    ).toBe("field_3 IN (5, 6, 'abc', 10, 'test')");
  });

  it(`calls ${getFieldOrValueSqlMock.name} to process field value`, () => {
    transpileEqualsNotEqualsOperator(
      ["=", ["field", 3], 5, "abc"],
      getFieldOrValueSqlMock
    );

    expect(getFieldOrValueSqlMock).toHaveBeenCalledTimes(3);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(1, ["field", 3]);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(2, 5);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(3, "abc");
  });
});

describe('"!=" operator', () => {
  const getFieldOrValueSqlMock = createGetFieldOrValueSqlMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates "field = value" for config with 2 arguments', () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["!=", ["field", 3], 5],
        getFieldOrValueSqlMock
      )
    ).toBe("field_3 != 5");
  });

  it('generates "field IN (value1, value2)" for config with 3 arguments', () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["!=", ["field", 3], 5, 6],
        getFieldOrValueSqlMock
      )
    ).toBe("field_3 NOT IN (5, 6)");
  });

  it("handles many arguments correctly", () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["!=", ["field", 3], 5, 6, "abc", 10, "test"],
        getFieldOrValueSqlMock
      )
    ).toBe("field_3 NOT IN (5, 6, 'abc', 10, 'test')");
  });

  it(`calls ${getFieldOrValueSqlMock.name} to process field value`, () => {
    transpileEqualsNotEqualsOperator(
      ["!=", ["field", 3], 5, "abc"],
      getFieldOrValueSqlMock
    );

    expect(getFieldOrValueSqlMock).toHaveBeenCalledTimes(3);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(1, ["field", 3]);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(2, 5);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(3, "abc");
  });
});
