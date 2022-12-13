import { LessOperatorConfig, MoreOperatorConfig } from "../types";
import { GetFieldOrValueSqlFn } from "../../fields/types";

export const transpileMoreOrLessOperator = (
  config: MoreOperatorConfig | LessOperatorConfig,
  getFieldOrValueSql: GetFieldOrValueSqlFn
): string => {
  const [operator, leftArg, rightArg] = config;

  const leftArgumentString = getFieldOrValueSql(leftArg);
  const rightArgumentString = getFieldOrValueSql(rightArg);

  return `${leftArgumentString} ${operator} ${rightArgumentString}`;
};
