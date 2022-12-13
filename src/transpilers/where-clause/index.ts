import { transpileMoreOrLessOperator } from "./operators/more-less";
import { transpileEqualsNotEqualsOperator } from "./operators/equals-not-equals";
import { transpileEmptyNotEmptyOperator } from "./operators/empty-not-empty";
import {
  WhereClauseConfig,
  WhereOperators,
  WhereOperatorTranspilerFn,
} from "./types";
import { transpileAndOrOperator } from "./operators/and-or";
import { transpileNotOperator } from "./operators/not";
import { GetFieldOrValueSqlFn } from "../fields/types";
import { SqlDialect } from "../../types";

const WhereClauseToTranspilerMap: Record<
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

export const processWhereOperator = (
  config: WhereClauseConfig,
  getFieldOrValueSql: GetFieldOrValueSqlFn,
  dialect: SqlDialect
): string => {
  const rootOperator = config[0];

  const operatorTranspiler = WhereClauseToTranspilerMap[rootOperator];

  if (operatorTranspiler) {
    return operatorTranspiler(
      config,
      getFieldOrValueSql,
      dialect,
      processWhereOperator
    );
  }

  console.warn("Unknown operator passed to where clause", {
    operator: rootOperator,
  });
  return "";
};
