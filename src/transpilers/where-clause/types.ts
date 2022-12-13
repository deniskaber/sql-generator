import { FieldNameDescriptor, SqlQueryFields } from "../fields/types";

export type WhereOperators = "=" | "!=" | ">" | "<" | "is-empty" | "not-empty";

export type WhereClauseConfig =
  | EqualsOperatorConfig
  | NotEqualsOperatorConfig
  | MoreOperatorConfig
  | LessOperatorConfig
  | EmptyOperatorConfig
  | NotEmptyOperatorConfig;

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

// FIXME: refactor this not to use SqlQueryFields
export type WhereOperatorTranspilerFn = (
  config: WhereClauseConfig,
  fields: SqlQueryFields
) => string;
