import { transpileEmptyNotEmptyOperator } from "./empty-not-empty";
import { createGetFieldOrValueSqlMock } from "../../../test_utils/mocks";

describe('"is-empty" operator', () => {
  const getFieldOrValueSqlMock = createGetFieldOrValueSqlMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates "IS NULL" for correct config', () => {
    expect(
      transpileEmptyNotEmptyOperator(
        ["is-empty", ["field", 3]],
        getFieldOrValueSqlMock
      )
    ).toBe("field_3 IS NULL");
  });

  it(`calls ${getFieldOrValueSqlMock.name} to process field value`, () => {
    transpileEmptyNotEmptyOperator(
      ["is-empty", ["field", 3]],
      getFieldOrValueSqlMock
    );

    expect(getFieldOrValueSqlMock).toHaveBeenCalledTimes(1);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(1, ["field", 3]);
  });
});

describe('"not-empty" operator', () => {
  const getFieldOrValueSqlMock = createGetFieldOrValueSqlMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates "IS NOT NULL" for correct config', () => {
    expect(
      transpileEmptyNotEmptyOperator(
        ["not-empty", ["field", 3]],
        getFieldOrValueSqlMock
      )
    ).toBe("field_3 IS NOT NULL");
  });

  it(`calls ${getFieldOrValueSqlMock.name} to process field value`, () => {
    transpileEmptyNotEmptyOperator(
      ["not-empty", ["field", 3]],
      getFieldOrValueSqlMock
    );

    expect(getFieldOrValueSqlMock).toHaveBeenCalledTimes(1);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(1, ["field", 3]);
  });
});
