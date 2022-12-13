export type FieldDescriptorOrValue =
  | FieldNameDescriptor
  | number
  | string
  | null;

export type FieldNameDescriptor = ["field", number];

export type SqlQueryFields = { [key: string]: string };
