import { FieldNameDescriptor, GetFieldOrValueSqlFn } from "../fields/types";
import { SqlDialect } from "../../types";

export type WhereOperators =
  | "="
  | "!="
  | ">"
  | "<"
  | "is-empty"
  | "not-empty"
  | "and"
  | "or"
  | "not";

export type WhereClauseConfig =
  | EqualsOperatorConfig
  | NotEqualsOperatorConfig
  | MoreOperatorConfig
  | LessOperatorConfig
  | EmptyOperatorConfig
  | NotEmptyOperatorConfig
  | AndOperatorConfig
  | OrOperatorConfig
  | NotOperatorConfig;

export type EqualsOperatorConfig =
  | ["=", EqualityOperatorValues, ...EqualityOperatorValues[]];

export type NotEqualsOperatorConfig =
  | ["!=", EqualityOperatorValues, ...EqualityOperatorValues[]];

export type MoreOperatorConfig = [
  ">",
  ComparisonOperatorValues,
  ComparisonOperatorValues
];
export type LessOperatorConfig = [
  "<",
  ComparisonOperatorValues,
  ComparisonOperatorValues
];

export type EmptyOperatorConfig = ["is-empty", EqualityOperatorValues];

export type NotEmptyOperatorConfig = ["not-empty", EqualityOperatorValues];

type EqualityOperatorValues = FieldNameDescriptor | number | string | null;

type ComparisonOperatorValues = FieldNameDescriptor | number;

export type ProcessChildFn = (
  config: WhereClauseConfig,
  getFieldOrValueSql: GetFieldOrValueSqlFn,
  dialect: SqlDialect
) => string;
export type WhereOperatorTranspilerFn = (
  config: WhereClauseConfig,
  getFieldOrValueSql: GetFieldOrValueSqlFn,
  dialect: SqlDialect,
  processChildFn: ProcessChildFn
) => string;

export type AndOperatorConfig =
  | ["and", WhereClauseConfig]
  | ["and", WhereClauseConfig, WhereClauseConfig]
  | ["and", WhereClauseConfig, WhereClauseConfig, ...WhereClauseConfig[]];

export type OrOperatorConfig =
  | ["or", WhereClauseConfig, WhereClauseConfig]
  | ["or", WhereClauseConfig, WhereClauseConfig, ...WhereClauseConfig[]];

export type NotOperatorConfig = ["not", WhereClauseConfig];
