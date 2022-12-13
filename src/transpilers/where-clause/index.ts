import {
  transpileEqualsNotEqualsOperator,
  transpileMoreOrLessOperator,
} from "./where-operators-transpilers";

export const WhereClauseToTranspilerMap = {
  "=": transpileEqualsNotEqualsOperator,
  "!=": transpileEqualsNotEqualsOperator,
  ">": transpileMoreOrLessOperator,
  "<": transpileMoreOrLessOperator,
};
