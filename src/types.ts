import { WhereClauseConfig } from "./transpilers/where-clause/types";

export enum SqlDialect {
  postgres = "postgres",
  mysql = "mysql",
  sqlserver = "sqlserver",
}
export type SqlDialectUnion = `${SqlDialect}`;

export type SqlQueryParameters = {
  where?: WhereClauseConfig;
  limit?: number;
};
