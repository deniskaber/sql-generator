import { SqlDialect, SqlQueryParameters } from "./types";
import { WhereClauseToTranspilerMap } from "./transpilers/where-clause";
import { SqlQueryFields } from "./transpilers/fields/types";
import { WhereClauseConfig } from "./transpilers/where-clause/types";

export const generateSql = (
  dialect: SqlDialect,
  fields: SqlQueryFields,
  query: SqlQueryParameters
): string => {
  let result = "SELECT * FROM data";

  if (query.where) {
    const whereString = processWhereOperator(query.where, fields);
    if (whereString) {
      result += ` WHERE ${whereString}`;
    }
  }

  return result;
};

const processWhereOperator = (
  config: WhereClauseConfig,
  fields: SqlQueryFields
): string => {
  const rootOperator = config[0];

  const operatorTranspiler = WhereClauseToTranspilerMap[rootOperator];

  if (operatorTranspiler) {
    // FIXME fix typing, remove ts-ignore
    // @ts-ignore
    return operatorTranspiler(config, fields);
  }

  console.warn("Unknown operator passed to where clause", {
    operator: rootOperator,
  });
  return "";
};
