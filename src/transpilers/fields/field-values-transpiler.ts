import { FieldDescriptorOrValue, SqlQueryFields } from "./types";
import { SqlDialect } from "../../types";
import { resolveFieldName } from "./operators/field-name";

const FieldOperatorToResolverMap = {
  field: resolveFieldName,
};

export const getFieldOrValueSqlGenerator =
  (dialect: SqlDialect, fields: SqlQueryFields) =>
  (fieldOrValue: FieldDescriptorOrValue): string => {
    if (typeof fieldOrValue === "number") {
      return fieldOrValue.toString(10);
    }

    if (typeof fieldOrValue === "string") {
      return `'${fieldOrValue}'`;
    }

    if (fieldOrValue === null) {
      return "NULL";
    }

    if (Array.isArray(fieldOrValue)) {
      const clauseType = fieldOrValue[0];
      return FieldOperatorToResolverMap[clauseType](
        fieldOrValue,
        fields,
        dialect
      );
    }

    console.warn("Unknown field argument type", {
      argumentValue: fieldOrValue,
    });
    return "";
  };
