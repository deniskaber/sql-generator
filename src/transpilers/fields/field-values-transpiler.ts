import {
  FieldDescriptorOrValue,
  FieldNameDescriptor,
  SqlQueryFields,
} from "./types";

export const resolveArgumentValue = (
  argumentValue: FieldDescriptorOrValue,
  fields: SqlQueryFields
): string | number => {
  if (typeof argumentValue === "number") {
    return argumentValue;
  }

  if (typeof argumentValue === "string") {
    // TODO: add handling for different dialects
    return `'${argumentValue}'`;
  }

  if (argumentValue === null) {
    return "NULL";
  }

  if (Array.isArray(argumentValue) && argumentValue[0] === "field") {
    return resolveFieldName(argumentValue, fields);
  }

  console.warn("Unknown field argument type", { argumentValue });
  return "";
};
const resolveFieldName = (
  fieldDescriptor: FieldNameDescriptor,
  fields: SqlQueryFields
) => {
  // TODO: add handling for different dialects
  const result = fields[fieldDescriptor[1]];

  if (!result) {
    console.error(
      "Failed to resolve field name. Check fields and where operators configuration",
      { fieldDescriptor, fields }
    );
  }

  return result || "";
};
