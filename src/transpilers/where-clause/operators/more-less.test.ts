import { transpileMoreOrLessOperator } from "./more-less";
import { createGetFieldOrValueSqlMock } from "../../../test_utils/mocks";

describe('">" operator', () => {
  const getFieldOrValueSqlMock = createGetFieldOrValueSqlMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates "field > value" for correct config', () => {
    expect(
      transpileMoreOrLessOperator(
        [">", ["field", 3], 5],
        getFieldOrValueSqlMock
      )
    ).toBe("field_3 > 5");
  });

  it(`calls ${getFieldOrValueSqlMock.name} to process field value`, () => {
    transpileMoreOrLessOperator([">", ["field", 3], 5], getFieldOrValueSqlMock);

    expect(getFieldOrValueSqlMock).toHaveBeenCalledTimes(2);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(1, ["field", 3]);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(2, 5);
  });
});

describe('"<" operator', () => {
  const getFieldOrValueSqlMock = createGetFieldOrValueSqlMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates "field < value" for correct config', () => {
    expect(
      transpileMoreOrLessOperator(
        ["<", ["field", 3], 5],
        getFieldOrValueSqlMock
      )
    ).toBe("field_3 < 5");
  });

  it(`calls ${getFieldOrValueSqlMock.name} to process field value`, () => {
    transpileMoreOrLessOperator([">", ["field", 3], 5], getFieldOrValueSqlMock);

    expect(getFieldOrValueSqlMock).toHaveBeenCalledTimes(2);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(1, ["field", 3]);
    expect(getFieldOrValueSqlMock).toHaveBeenNthCalledWith(2, 5);
  });
});
