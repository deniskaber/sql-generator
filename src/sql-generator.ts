import { SqlDialect, SqlDialectUnion, SqlQueryParameters } from "./types";
import { WhereClauseToTranspilerMap } from "./transpilers/where-clause";
import {
  GetFieldOrValueSqlFn,
  SqlQueryFields,
} from "./transpilers/fields/types";
import { WhereClauseConfig } from "./transpilers/where-clause/types";
import { getFieldOrValueSqlGenerator } from "./transpilers/fields";

export const generateSql = (
  dialect: SqlDialectUnion,
  fields: SqlQueryFields,
  query: SqlQueryParameters
): string => {
  let result = "SELECT * FROM data";

  const getFieldOrValueSql = getFieldOrValueSqlGenerator(
    dialect as SqlDialect,
    fields
  );

  if (query.where) {
    const whereString = processWhereOperator(
      query.where,
      getFieldOrValueSql,
      dialect as SqlDialect
    );
    if (whereString) {
      result += ` WHERE ${whereString}`;
    }
  }

  // TODO: add handling for "limit"

  return result;
};

const processWhereOperator = (
  config: WhereClauseConfig,
  getFieldOrValueSql: GetFieldOrValueSqlFn,
  dialect: SqlDialect
): string => {
  const rootOperator = config[0];

  const operatorTranspiler = WhereClauseToTranspilerMap[rootOperator];

  if (operatorTranspiler) {
    return operatorTranspiler(
      config,
      getFieldOrValueSql,
      dialect,
      processWhereOperator
    );
  }

  console.warn("Unknown operator passed to where clause", {
    operator: rootOperator,
  });
  return "";
};
