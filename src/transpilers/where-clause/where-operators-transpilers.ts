import { EqualsOperatorConfig, MoreOperatorConfig } from "./types";
import { resolveArgumentValue } from "../fields";
import { SqlQueryFields } from "../fields/types";

export const transpileEqualsNotEqualsOperator = (
  config: EqualsOperatorConfig,
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
      return operator === "="
        ? `${leftArgString} IS NULL`
        : `${leftArgString} IS NOT NULL`;
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
export const transpileMoreOrLessOperator = (
  config: MoreOperatorConfig,
  fields: SqlQueryFields
): string => {
  const [operator, leftArg, rightArg] = config;

  const leftArgumentString = resolveArgumentValue(leftArg, fields);
  const rightArgumentString = resolveArgumentValue(rightArg, fields);

  return `${leftArgumentString} ${operator} ${rightArgumentString}`;
};
