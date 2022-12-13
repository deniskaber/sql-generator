import { FieldDescriptorOrValue } from "../transpilers/fields/types";
import { WhereClauseConfig } from "../transpilers/where-clause/types";

export const createGetFieldOrValueSqlMock = () =>
  jest.fn((fieldOrValue: FieldDescriptorOrValue) => {
    if (typeof fieldOrValue === "string") {
      return `'${fieldOrValue}'`;
    }

    if (typeof fieldOrValue === "number") {
      return fieldOrValue.toString(10);
    }

    if (Array.isArray(fieldOrValue) && fieldOrValue[0] === "field") {
      return `${fieldOrValue[0]}_${fieldOrValue[1]}`;
    }

    throw new Error("Mock for this case is not implemented!");
  });

export const createProcessChildFnMock = () =>
  jest.fn((config: WhereClauseConfig) => JSON.stringify(config));
