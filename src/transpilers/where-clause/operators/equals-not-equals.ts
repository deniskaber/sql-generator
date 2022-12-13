import { EqualsOperatorConfig, NotEqualsOperatorConfig } from "../types";
import { GetFieldOrValueSqlFn } from "../../fields/types";
import { transpileEmptyNotEmptyOperator } from "./empty-not-empty";

export const transpileEqualsNotEqualsOperator = (
  config: EqualsOperatorConfig | NotEqualsOperatorConfig,
  getFieldOrValueSql: GetFieldOrValueSqlFn
): string => {
  const [operator, leftArg, ...restArgs] = config;

  if (!restArgs.length) {
    console.warn(
      'Invalid config for "=" where operator. Expected more than 1 value passed'
    );
    return "";
  }

  const leftArgString = getFieldOrValueSql(leftArg);

  if (restArgs.length === 1) {
    const rightField = restArgs[0];
    if (restArgs[0] === null) {
      const correspondingEmptyClauseOperator =
        operator === "=" ? "is-empty" : "not-empty";
      return transpileEmptyNotEmptyOperator(
        [correspondingEmptyClauseOperator, leftArg],
        getFieldOrValueSql
      );
    }
    const rightArgString = getFieldOrValueSql(rightField);

    return operator === "="
      ? `${leftArgString} = ${rightArgString}`
      : // TODO: add handling for sqlserver ("<>" instead of "!=")
        `${leftArgString} != ${rightArgString}`;
  }

  const inValues = restArgs.map((arg) => getFieldOrValueSql(arg));

  return operator === "="
    ? `${leftArgString} IN (${inValues.join(", ")})`
    : `${leftArgString} NOT IN (${inValues.join(", ")})`;
};
