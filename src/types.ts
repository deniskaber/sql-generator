export type SqlDialect = "postgres" | "mysql" | "sqlserver";
export type SqlQueryFields = { [key: string]: string };

export type SqlQueryParameters = {
  where?: WhereOperatorConfig;
  limit?: number;
};

export type WhereOperatorConfig = EqualityOperatorConfig;

export type EqualityOperatorConfig = [
  "=",
  EqualityOperatorValues,
  EqualityOperatorValues,
  ...EqualityOperatorValues[]
];

export type EqualityOperatorValues =
  | FieldNameDescriptor
  | number
  | string
  | null;

export type FieldDescriptorOrValue =
  | FieldNameDescriptor
  | number
  | string
  | null;
export type FieldNameDescriptor = ["field", number];
