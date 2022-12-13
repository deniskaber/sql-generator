import {
  EmptyOperatorConfig,
  EqualsOperatorConfig,
  NotEmptyOperatorConfig,
} from "../types";
import { SqlQueryFields } from "../../fields/types";
import { resolveArgumentValue } from "../../fields";

export const transpileEmptyNotEmptyOperator = (
  config: EmptyOperatorConfig | NotEmptyOperatorConfig,
  fields: SqlQueryFields
): string => {
  const [operator, arg] = config;

  const argString = resolveArgumentValue(arg, fields);

  return operator === "is-empty"
    ? `${argString} IS NULL`
    : `${argString} IS NOT NULL`;
};
