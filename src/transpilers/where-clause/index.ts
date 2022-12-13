import { transpileMoreOrLessOperator } from "./operators/more-less";
import { transpileEqualsNotEqualsOperator } from "./operators/equals-not-equals";
import { transpileEmptyNotEmptyOperator } from "./operators/empty-not-empty";
import { WhereOperators, WhereOperatorTranspilerFn } from "./types";
import { transpileAndOrOperator } from "./operators/and-or";
import { transpileNotOperator } from "./operators/not";

export const WhereClauseToTranspilerMap: Record<
  WhereOperators,
  WhereOperatorTranspilerFn
> = {
  "=": transpileEqualsNotEqualsOperator as WhereOperatorTranspilerFn,
  "!=": transpileEqualsNotEqualsOperator as WhereOperatorTranspilerFn,
  ">": transpileMoreOrLessOperator as WhereOperatorTranspilerFn,
  "<": transpileMoreOrLessOperator as WhereOperatorTranspilerFn,
  "is-empty": transpileEmptyNotEmptyOperator as WhereOperatorTranspilerFn,
  "not-empty": transpileEmptyNotEmptyOperator as WhereOperatorTranspilerFn,

  and: transpileAndOrOperator as WhereOperatorTranspilerFn,
  or: transpileAndOrOperator as WhereOperatorTranspilerFn,
  not: transpileNotOperator as WhereOperatorTranspilerFn,
};
