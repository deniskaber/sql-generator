import { SqlDialect, SqlDialectUnion, SqlQueryParameters } from "./types";
import { processWhereOperator } from "./transpilers/where-clause";
import { SqlQueryFields } from "./transpilers/fields/types";
import { getFieldOrValueSqlGenerator } from "./transpilers/fields";
import { processLimitOperator } from "./transpilers/limit-clause";

export const generateSql = (
  dialectString: SqlDialectUnion,
  fields: SqlQueryFields,
  query: SqlQueryParameters
): string => {
  let result = "SELECT * FROM data";
  const dialect = dialectString as SqlDialect;

  const getFieldOrValueSql = getFieldOrValueSqlGenerator(dialect, fields);

  if (query.where) {
    const whereString = processWhereOperator(
      query.where,
      getFieldOrValueSql,
      dialect
    );
    if (whereString) {
      result += ` WHERE ${whereString}`;
    }
  }

  if (!!query.limit) {
    const limitStr = processLimitOperator(query.limit, dialect);
    result = injectLimitString(result, limitStr, dialect);
  }

  return result;
};

const injectLimitString = (
  query: string,
  limitString: string,
  dialect: SqlDialect
): string => {
  if (dialect === SqlDialect.sqlserver) {
    return query.replace("SELECT ", `SELECT ${limitString} `);
  }

  return `${query} ${limitString}`;
};
