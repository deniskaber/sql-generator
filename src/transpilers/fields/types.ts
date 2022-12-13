export type FieldDescriptorOrValue =
  | FieldNameDescriptor
  | number
  | string
  | null;

export type FieldNameDescriptor = ["field", number];

export type SqlQueryFields = { [key: string]: string };

export type GetFieldOrValueSqlFn = (
  fieldDescriptor: FieldDescriptorOrValue | number | string | null
) => string;
