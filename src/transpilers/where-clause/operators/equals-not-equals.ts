import {
  EqualsOperatorConfig,
  NotEqualsOperatorConfig,
  OrOperatorConfig,
  ProcessChildFn,
} from "../types";
import { GetFieldOrValueSqlFn } from "../../fields/types";
import { transpileEmptyNotEmptyOperator } from "./empty-not-empty";
import { SqlDialect } from "../../../types";

type EqualsOperatorFormatterFn = (
  operator: "=" | "!=",
  leftArg: string,
  rightArg: string
) => string;
const formatPostgresEqualsOperator = (
  operator: "=" | "!=",
  leftArg: string,
  rightArg: string
): string => `${leftArg} ${operator} ${rightArg}`;
const formatMySqlEqualsOperator = (
  operator: "=" | "!=",
  leftArg: string,
  rightArg: string
): string => `${leftArg} ${operator} ${rightArg}`;
const formatSqlServerEqualsOperator = (
  operator: "=" | "!=",
  leftArg: string,
  rightArg: string
): string => `${leftArg} ${operator === "!=" ? "<>" : "="} ${rightArg}`;
const EqualsOperatorFormattersMap: Record<
  SqlDialect,
  EqualsOperatorFormatterFn
> = {
  [SqlDialect.postgres]: formatPostgresEqualsOperator,
  [SqlDialect.mysql]: formatMySqlEqualsOperator,
  [SqlDialect.sqlserver]: formatSqlServerEqualsOperator,
};

export const transpileEqualsNotEqualsOperator = (
  config: EqualsOperatorConfig | NotEqualsOperatorConfig,
  getFieldOrValueSql: GetFieldOrValueSqlFn,
  dialect: SqlDialect,
  processChildFn: ProcessChildFn
): string => {
  const [operator, leftArg, ...restArgs] = config;

  if (!restArgs.length) {
    console.warn(
      'Invalid config for "=" where operator. Expected more than 1 value passed'
    );
    return "";
  }

  const leftArgString = getFieldOrValueSql(leftArg);
  const correspondingEmptyClauseOperator =
    operator === "=" ? "is-empty" : "not-empty";

  if (restArgs.length === 1) {
    const rightField = restArgs[0];

    // case for 1 argument which is null, write IS (NOT) NULL
    if (restArgs[0] === null) {
      return transpileEmptyNotEmptyOperator(
        [correspondingEmptyClauseOperator, leftArg],
        getFieldOrValueSql
      );
    }

    const rightArgString = getFieldOrValueSql(rightField);

    // case for 1 argument which is not null, write left =/!= right
    const formatter = EqualsOperatorFormattersMap[dialect];
    return formatter(operator, leftArgString, rightArgString);
  }

  const nullArgs = restArgs.filter((value) => value === null);
  const nonNullArgs = restArgs.filter((value) => value !== null);

  if (nullArgs.length > 0 && nonNullArgs.length === 0) {
    return processChildFn(
      [correspondingEmptyClauseOperator, leftArg],
      getFieldOrValueSql,
      dialect
    );
  }

  if (nullArgs.length > 0 && nonNullArgs.length > 0) {
    const config: OrOperatorConfig = [
      "or",
      [operator, leftArg, ...nonNullArgs],
      [correspondingEmptyClauseOperator, leftArg],
    ];

    return processChildFn(config, getFieldOrValueSql, dialect);
  }

  const inValues = restArgs.map((arg) => getFieldOrValueSql(arg));

  return operator === "="
    ? `${leftArgString} IN (${inValues.join(", ")})`
    : `${leftArgString} NOT IN (${inValues.join(", ")})`;
};
