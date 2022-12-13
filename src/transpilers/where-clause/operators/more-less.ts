import { LessOperatorConfig, MoreOperatorConfig } from "../types";
import { SqlQueryFields } from "../../fields/types";
import { resolveArgumentValue } from "../../fields";

export const transpileMoreOrLessOperator = (
  config: MoreOperatorConfig | LessOperatorConfig,
  fields: SqlQueryFields
): string => {
  const [operator, leftArg, rightArg] = config;

  const leftArgumentString = resolveArgumentValue(leftArg, fields);
  const rightArgumentString = resolveArgumentValue(rightArg, fields);

  return `${leftArgumentString} ${operator} ${rightArgumentString}`;
};
