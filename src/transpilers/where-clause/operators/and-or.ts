import {
  AndOperatorConfig,
  OrOperatorConfig,
  ProcessChildFn,
  WhereClauseConfig,
} from "../types";
import { GetFieldOrValueSqlFn } from "../../fields/types";
import { SqlDialect } from "../../../types";

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
  dialect: SqlDialect,
  processChildFn: ProcessChildFn
): string => {
  const [operator, leftClause, rightClause] = config;

  if (!rightClause) {
    return processChildFn(leftClause, getFieldOrValueSql, dialect);
  }

  const leftResult = processChildFn(leftClause, getFieldOrValueSql, dialect);
  const rightResult = processChildFn(rightClause, getFieldOrValueSql, dialect);

  return formatAndOrClauseResult(
    operator,
    leftResult,
    rightResult,
    leftClause,
    rightClause
  );
};
