import {
  AndOperatorConfig,
  OrOperatorConfig,
  WhereClauseConfig,
  WhereOperatorTranspilerFn,
} from "../types";
import { GetFieldOrValueSqlFn } from "../../fields/types";

const formatAndOrClauseResult = (
  operator: "and" | "or",
  leftResult: string,
  rightResult: string,
  leftClause: WhereClauseConfig,
  rightClause: WhereClauseConfig
): string => {
  const leftOperator = leftClause[0];
  const rightOperator = rightClause[0];
  const operatorString = operator === "and" ? "AND" : "OR";

  if (
    (operator === "and" && leftOperator === "or") ||
    (operator === "or" && leftOperator === "and")
  ) {
    return `(${leftResult}) ${operatorString} ${rightResult}`;
  }

  if (
    (operator === "and" && rightOperator === "or") ||
    (operator === "or" && rightOperator === "and")
  ) {
    return `${leftResult} ${operatorString} (${rightResult})`;
  }

  return `${leftResult} ${operatorString} ${rightResult}`;
};

export const transpileAndOrOperator = (
  config: AndOperatorConfig | OrOperatorConfig,
  getFieldOrValueSql: GetFieldOrValueSqlFn,
  processChildFn: WhereOperatorTranspilerFn
): string => {
  const [operator, leftClause, rightClause] = config;

  if (!rightClause) {
    return processChildFn(leftClause, getFieldOrValueSql, processChildFn);
  }

  const leftResult = processChildFn(
    leftClause,
    getFieldOrValueSql,
    processChildFn
  );
  const rightResult = processChildFn(
    rightClause,
    getFieldOrValueSql,
    processChildFn
  );

  return formatAndOrClauseResult(
    operator,
    leftResult,
    rightResult,
    leftClause,
    rightClause
  );
};
