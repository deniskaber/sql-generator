import {
  createGetFieldOrValueSqlMock,
  createProcessChildFnMock,
} from "../../../test_utils/mocks";
import { transpileNotOperator } from "./not";
import { SqlDialect } from "../../../types";

describe('"and" operator', () => {
  const getFieldOrValueSqlMock = createGetFieldOrValueSqlMock();
  const processChildFnMock = createProcessChildFnMock();
  const defaultDialect = SqlDialect.postgres;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates "> OR =" config for "<" operator', () => {
    expect(
      transpileNotOperator(
        ["not", [">", ["field", 1], 5]],
        getFieldOrValueSqlMock,
        defaultDialect,
        processChildFnMock
      )
    ).toBe('["or",["<",["field",1],5],["=",["field",1],5]]');

    expect(processChildFnMock).toHaveBeenCalledTimes(1);
    expect(processChildFnMock).toHaveBeenCalledWith(
      ["or", ["<", ["field", 1], 5], ["=", ["field", 1], 5]],
      getFieldOrValueSqlMock,
      defaultDialect
    );
  });

  it('generates "< OR =" config for ">" operator', () => {
    expect(
      transpileNotOperator(
        ["not", ["<", ["field", 1], 5]],
        getFieldOrValueSqlMock,
        defaultDialect,
        processChildFnMock
      )
    ).toBe('["or",[">",["field",1],5],["=",["field",1],5]]');

    expect(processChildFnMock).toHaveBeenCalledTimes(1);
    expect(processChildFnMock).toHaveBeenCalledWith(
      ["or", [">", ["field", 1], 5], ["=", ["field", 1], 5]],
      getFieldOrValueSqlMock,
      defaultDialect
    );
  });

  it('generates "not-empty" config for "is-empty" operator', () => {
    expect(
      transpileNotOperator(
        ["not", ["is-empty", ["field", 1]]],
        getFieldOrValueSqlMock,
        defaultDialect,
        processChildFnMock
      )
    ).toBe('["not-empty",["field",1]]');

    expect(processChildFnMock).toHaveBeenCalledTimes(1);
    expect(processChildFnMock).toHaveBeenCalledWith(
      ["not-empty", ["field", 1]],
      getFieldOrValueSqlMock,
      defaultDialect
    );
  });

  it('generates "is-empty" config for "not-empty" operator', () => {
    expect(
      transpileNotOperator(
        ["not", ["not-empty", ["field", 1]]],
        getFieldOrValueSqlMock,
        defaultDialect,
        processChildFnMock
      )
    ).toBe('["is-empty",["field",1]]');

    expect(processChildFnMock).toHaveBeenCalledTimes(1);
    expect(processChildFnMock).toHaveBeenCalledWith(
      ["is-empty", ["field", 1]],
      getFieldOrValueSqlMock,
      defaultDialect
    );
  });

  it('generates "!=" config for "=" operator', () => {
    expect(
      transpileNotOperator(
        ["not", ["=", ["field", 1], 5]],
        getFieldOrValueSqlMock,
        defaultDialect,
        processChildFnMock
      )
    ).toBe('["!=",["field",1],5]');

    expect(processChildFnMock).toHaveBeenCalledTimes(1);
    expect(processChildFnMock).toHaveBeenCalledWith(
      ["!=", ["field", 1], 5],
      getFieldOrValueSqlMock,
      defaultDialect
    );
  });

  it('generates "=" config for "!=" operator', () => {
    expect(
      transpileNotOperator(
        ["not", ["!=", ["field", 1], 5]],
        getFieldOrValueSqlMock,
        defaultDialect,
        processChildFnMock
      )
    ).toBe('["=",["field",1],5]');

    expect(processChildFnMock).toHaveBeenCalledTimes(1);
    expect(processChildFnMock).toHaveBeenCalledWith(
      ["=", ["field", 1], 5],
      getFieldOrValueSqlMock,
      defaultDialect
    );
  });
});
