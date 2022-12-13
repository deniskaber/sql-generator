import { SqlDialect } from "../../types";

type LimitMapperFn = (limit: number) => string;
const formatPostgresLimit = (limit: number): string => `LIMIT ${limit}`;
const formatMySqlLimit = (limit: number): string => `LIMIT ${limit}`;
const formatSqlServerLimit = (limit: number): string => `TOP ${limit}`;

const LimitHandlersMap: Record<SqlDialect, LimitMapperFn> = {
  [SqlDialect.postgres]: formatPostgresLimit,
  [SqlDialect.mysql]: formatMySqlLimit,
  [SqlDialect.sqlserver]: formatSqlServerLimit,
};

export const processLimitOperator = (
  limit: number,
  dialect: SqlDialect
): string => {
  return LimitHandlersMap[dialect](limit);
};
