import {
  createGetFieldOrValueSqlMock,
  createProcessChildFnMock,
} from "../../../test_utils/mocks";
import { transpileAndOrOperator } from "./and-or";
import { WhereClauseConfig } from "../types";
import { SqlDialect } from "../../../types";

describe('"and" operator', () => {
  const getFieldOrValueSqlMock = createGetFieldOrValueSqlMock();
  const processChildFnMock = createProcessChildFnMock();
  const defaultDialect = SqlDialect.postgres;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates "clause1 AND clause2" for correct config', () => {
    expect(
      transpileAndOrOperator(
        [
          "and",
          ["clause1"] as unknown as WhereClauseConfig,
          ["clause2"] as unknown as WhereClauseConfig,
        ],
        getFieldOrValueSqlMock,
        defaultDialect,
        processChildFnMock
      )
    ).toBe('["clause1"] AND ["clause2"]');
  });

  it(`calls "processChildFn" to process child where clause`, () => {
    transpileAndOrOperator(
      [
        "and",
        ["clause1"] as unknown as WhereClauseConfig,
        ["clause2"] as unknown as WhereClauseConfig,
      ],
      getFieldOrValueSqlMock,
      defaultDialect,
      processChildFnMock
    );

    expect(processChildFnMock).toHaveBeenCalledTimes(2);
  });
});

describe('"or" operator', () => {
  const getFieldOrValueSqlMock = createGetFieldOrValueSqlMock();
  const processChildFnMock = createProcessChildFnMock();
  const defaultDialect = SqlDialect.postgres;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates "clause1 OR clause2" for correct config', () => {
    expect(
      transpileAndOrOperator(
        [
          "or",
          ["clause1"] as unknown as WhereClauseConfig,
          ["clause2"] as unknown as WhereClauseConfig,
        ],
        getFieldOrValueSqlMock,
        defaultDialect,
        processChildFnMock
      )
    ).toBe('["clause1"] OR ["clause2"]');
  });

  it(`calls "processChildFn" to process child where clause`, () => {
    transpileAndOrOperator(
      [
        "or",
        ["clause1"] as unknown as WhereClauseConfig,
        ["clause2"] as unknown as WhereClauseConfig,
      ],
      getFieldOrValueSqlMock,
      defaultDialect,
      processChildFnMock
    );

    expect(processChildFnMock).toHaveBeenCalledTimes(2);
  });
});
