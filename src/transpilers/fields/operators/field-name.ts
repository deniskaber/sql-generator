import { FieldNameDescriptor, SqlQueryFields } from "../types";
import { SqlDialect } from "../../../types";

type FieldNameFormatter = (name: string) => string;

// NOTE: due time limit I didn't add all SQL reserved words here.
const ReservedFieldNamesByDialectMap: { [key in SqlDialect]: string[] } = {
  postgres: ["all", "and", "user", "string"],
  sqlserver: ["all", "and", "user", "string"],
  mysql: ["all", "and", "user", "string"],
};

const isReservedFieldName = (
  fieldName: string,
  dialect: SqlDialect
): boolean => {
  return ReservedFieldNamesByDialectMap[dialect].includes(fieldName);
};

const formatPostgresField: FieldNameFormatter = (fieldName: string): string =>
  `"${fieldName}"`;
const formatSqlServerField = (fieldName: string): string => `"${fieldName}"`;
const formatMySqlField = (fieldName: string): string => `\`${fieldName}\``;

const SpecialFieldNameFormatterMap: Record<SqlDialect, FieldNameFormatter> = {
  [SqlDialect.postgres]: formatPostgresField,
  [SqlDialect.sqlserver]: formatSqlServerField,
  [SqlDialect.mysql]: formatMySqlField,
};

// TODO: add tests
export const resolveFieldName = (
  fieldDescriptor: FieldNameDescriptor,
  queryFields: SqlQueryFields,
  dialect: SqlDialect
) => {
  const [_operator, fieldNumberKey] = fieldDescriptor;
  const fieldName = queryFields[fieldNumberKey];

  if (!fieldName) {
    console.error(
      "Failed to resolve field name. Check fields and where operators configuration",
      { fieldDescriptor, queryFields }
    );
  }

  if (
    isReservedFieldName(fieldName, dialect) ||
    (dialect === SqlDialect.mysql && fieldName.includes("-"))
  ) {
    const formatter = SpecialFieldNameFormatterMap[dialect];
    return formatter(fieldName);
  }

  return fieldName || "";
};
