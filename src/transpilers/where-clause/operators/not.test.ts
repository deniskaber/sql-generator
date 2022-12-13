import {
  createGetFieldOrValueSqlMock,
  createProcessChildFnMock,
} from "../../../test_utils/mocks";
import { transpileNotOperator } from "./not";

describe('"and" operator', () => {
  const getFieldOrValueSqlMock = createGetFieldOrValueSqlMock();
  const processChildFnMock = createProcessChildFnMock();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates ">" OR "=" config for "<" operator', () => {
    expect(
      transpileNotOperator(
        ["not", [">", ["field", 1], 5]],
        getFieldOrValueSqlMock,
        processChildFnMock
      )
    ).toBe('["or",["<",["field",1],5],["=",["field",1],5]]');
  });

  it('generates "<" OR "=" config for ">" operator', () => {
    expect(
      transpileNotOperator(
        ["not", ["<", ["field", 1], 5]],
        getFieldOrValueSqlMock,
        processChildFnMock
      )
    ).toBe('["or",[">",["field",1],5],["=",["field",1],5]]');
  });

  it('generates "not-empty" config for "is-empty" operator', () => {
    expect(
      transpileNotOperator(
        ["not", ["is-empty", ["field", 1]]],
        getFieldOrValueSqlMock,
        processChildFnMock
      )
    ).toBe('["not-empty",["field",1]]');
  });

  it('generates "is-empty" config for "not-empty" operator', () => {
    expect(
      transpileNotOperator(
        ["not", ["not-empty", ["field", 1]]],
        getFieldOrValueSqlMock,
        processChildFnMock
      )
    ).toBe('["is-empty",["field",1]]');
  });

  it('generates "!=" config for "=" operator', () => {
    expect(
      transpileNotOperator(
        ["not", ["=", ["field", 1], 5]],
        getFieldOrValueSqlMock,
        processChildFnMock
      )
    ).toBe('["!=",["field",1],5]');
  });

  it('generates "=" config for "!=" operator', () => {
    expect(
      transpileNotOperator(
        ["not", ["!=", ["field", 1], 5]],
        getFieldOrValueSqlMock,
        processChildFnMock
      )
    ).toBe('["=",["field",1],5]');
  });
});
