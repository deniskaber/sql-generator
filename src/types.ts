import { WhereClauseConfig } from "./transpilers/where-clause/types";

export type SqlDialect = "postgres" | "mysql" | "sqlserver";

export type SqlQueryParameters = {
  where?: WhereClauseConfig;
  limit?: number;
};
