import { EqualsOperatorConfig, NotEqualsOperatorConfig } from "../types";
import { SqlQueryFields } from "../../fields/types";
import { resolveArgumentValue } from "../../fields";
import { transpileEmptyNotEmptyOperator } from "./empty-not-empty";

export const transpileEqualsNotEqualsOperator = (
  config: EqualsOperatorConfig | NotEqualsOperatorConfig,
  fields: SqlQueryFields
): string => {
  const [operator, leftArg, ...restArgs] = config;

  if (!restArgs.length) {
    console.warn(
      'Invalid config for "=" where operator. Expected more than 1 value passed'
    );
    return "";
  }

  const leftArgString = resolveArgumentValue(leftArg, fields);

  if (restArgs.length === 1) {
    const rightField = restArgs[0];
    if (restArgs[0] === null) {
      const correspondingEmptyClauseOperator =
        operator === "=" ? "is-empty" : "not-empty";
      return transpileEmptyNotEmptyOperator(
        [correspondingEmptyClauseOperator, leftArg],
        fields
      );
    }
    const rightArgString = resolveArgumentValue(rightField, fields);

    return operator === "="
      ? `${leftArgString} = ${rightArgString}`
      : // TODO: add handling for sqlserver ("<>" instead of "!=")
        `${leftArgString} != ${rightArgString}`;
  }

  const inValues = restArgs.map((arg) => resolveArgumentValue(arg, fields));

  return operator === "="
    ? `${leftArgString} IN (${inValues.join(", ")})`
    : `${leftArgString} NOT IN (${inValues.join(", ")})`;
};
