import { FieldNameDescriptor } from "../fields/types";

export type WhereOperators = "=" | "!=" | ">" | "<";

export type WhereClauseConfig =
  | EqualsOperatorConfig
  | NotEqualsOperatorConfig
  | MoreOperatorConfig
  | LessOperatorConfig;

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

type EqualityOperatorValues = FieldNameDescriptor | number | string | null;

type ComparisonOperatorValues = FieldNameDescriptor | number;
