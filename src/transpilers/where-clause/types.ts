import { FieldNameDescriptor, GetFieldOrValueSqlFn } from "../fields/types";

export type WhereOperators =
  | "="
  | "!="
  | ">"
  | "<"
  | "is-empty"
  | "not-empty"
  | "and"
  | "or";

export type WhereClauseConfig =
  | EqualsOperatorConfig
  | NotEqualsOperatorConfig
  | MoreOperatorConfig
  | LessOperatorConfig
  | EmptyOperatorConfig
  | NotEmptyOperatorConfig
  | AndOperatorConfig
  | OrOperatorConfig;

export type EqualsOperatorConfig =
  | [
      "=",
      EqualityOperatorValues,
      EqualityOperatorValues,
      ...EqualityOperatorValues[]
    ];

export type NotEqualsOperatorConfig =
  | [
      "!=",
      EqualityOperatorValues,
      EqualityOperatorValues,
      ...EqualityOperatorValues[]
    ];

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

export type WhereOperatorTranspilerFn = (
  config: WhereClauseConfig,
  getFieldOrValueSql: GetFieldOrValueSqlFn
) => string;

export type AndOperatorConfig =
  | ["and", WhereClauseConfig]
  | ["and", WhereClauseConfig, WhereClauseConfig];

export type OrOperatorConfig = ["or", WhereClauseConfig, WhereClauseConfig];
