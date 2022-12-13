import {
  EqualsOperatorConfig,
  FieldDescriptorOrValue,
  FieldNameDescriptor,
  MoreOperatorConfig,
  SqlDialect,
  SqlQueryFields,
  SqlQueryParameters,
  WhereOperatorConfig,
} from "./types";

export const generateSql = (
  dialect: SqlDialect,
  fields: SqlQueryFields,
  query: SqlQueryParameters
): string => {
  let result = "SELECT * FROM data";

  if (query.where) {
    const whereString = processWhereOperator(query.where, fields);
    if (whereString) {
      result += ` WHERE ${whereString}`;
    }
  }

  return result;
};

const processWhereOperator = (
  config: WhereOperatorConfig,
  fields: SqlQueryFields
): string => {
  const rootOperator = config[0];

  if (rootOperator === "=") {
    return transpileEqualsOperator(config, fields);
  }

  if (rootOperator === ">") {
    return transpileMoreOperator(config, fields);
  }

  console.warn("Unknown operator passed to where clause", {
    operator: rootOperator,
  });
  return "";
};

const transpileEqualsOperator = (
  config: EqualsOperatorConfig,
  fields: SqlQueryFields
): string => {
  const [_operator, leftArg, ...restArgs] = config;

  if (!restArgs.length) {
    console.warn(
      'Invalid config for "=" where operator. Expected more than 1 value passed'
    );
    return "";
  }

  const leftFieldString = resolveArgumentValue(leftArg, fields);

  if (restArgs.length === 1) {
    const rightField = restArgs[0];
    if (restArgs[0] === null) {
      return `${leftFieldString} IS NULL`;
    }

    return `${leftFieldString} = ${resolveArgumentValue(rightField, fields)}`;
  }

  const inValues = restArgs.map((arg) => resolveArgumentValue(arg, fields));

  return `${leftFieldString} in (${inValues.join(", ")})`;
};

const transpileMoreOperator = (
  config: MoreOperatorConfig,
  fields: SqlQueryFields
): string => {
  const [_operator, leftArg, rightArg] = config;

  return `${resolveArgumentValue(leftArg, fields)} > ${resolveArgumentValue(
    rightArg,
    fields
  )}`;
};

const resolveArgumentValue = (
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
