export type SqlDialect = "postgres" | "mysql" | "sqlserver";
export type SqlQueryFields = { [key: string]: string };

export type SqlQueryParameters = {
  where?: WhereOperatorConfig;
  limit?: number;
};

type WhereOperatorConfig = [
  "=",
  EqualityOperatorValues,
  EqualityOperatorValues,
  ...EqualityOperatorValues[]
];

type EqualityOperatorValues = FieldValueDescriptor | number | string | null;
type FieldValueDescriptor = ["field", number];
