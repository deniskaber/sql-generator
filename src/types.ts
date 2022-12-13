export type SqlDialect = "postgres" | "mysql" | "sqlserver";
export type SqlQueryFields = { [key: string]: string };

export type SqlQueryParameters = {
  where?: WhereOperatorConfig;
  limit?: number;
};

export type WhereOperatorConfig =
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

export type FieldDescriptorOrValue =
  | FieldNameDescriptor
  | number
  | string
  | null;

export type FieldNameDescriptor = ["field", number];
