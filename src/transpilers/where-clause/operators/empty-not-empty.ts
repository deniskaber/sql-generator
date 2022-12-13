import { EmptyOperatorConfig, NotEmptyOperatorConfig } from "../types";
import { GetFieldOrValueSqlFn } from "../../fields/types";

export const transpileEmptyNotEmptyOperator = (
  config: EmptyOperatorConfig | NotEmptyOperatorConfig,
  getFieldOrValueSql: GetFieldOrValueSqlFn
): string => {
  const [operator, arg] = config;

  const argString = getFieldOrValueSql(arg);

  return operator === "is-empty"
    ? `${argString} IS NULL`
    : `${argString} IS NOT NULL`;
};
