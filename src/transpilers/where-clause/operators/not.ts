import {
  EmptyOperatorConfig,
  EqualsOperatorConfig,
  NotEmptyOperatorConfig,
  NotEqualsOperatorConfig,
  NotOperatorConfig,
  OrOperatorConfig,
  ProcessChildFn,
} from "../types";
import { GetFieldOrValueSqlFn } from "../../fields/types";
import { SqlDialect } from "../../../types";

export const transpileNotOperator = (
  config: NotOperatorConfig,
  getFieldOrValueSql: GetFieldOrValueSqlFn,
  dialect: SqlDialect,
  processChildFn: ProcessChildFn
): string => {
  const whereClause = config[1];

  const whereOperator = whereClause[0];
  switch (whereOperator) {
    case ">":
    case "<": {
      const [_, ...restConfig] = whereClause;
      const oppositeOperator = whereOperator === ">" ? "<" : ">";
      const oppositeConfig: OrOperatorConfig = [
        "or",
        [oppositeOperator, ...restConfig],
        ["=", ...restConfig],
      ];
      return processChildFn(oppositeConfig, getFieldOrValueSql, dialect);
    }

    case "=":
    case "!=": {
      const [_, ...restConfig] = whereClause;
      const oppositeOperator = whereOperator === "=" ? "!=" : "=";
      const oppositeConfig: EqualsOperatorConfig | NotEqualsOperatorConfig = [
        oppositeOperator,
        ...restConfig,
      ];
      return processChildFn(oppositeConfig, getFieldOrValueSql, dialect);
    }

    case "is-empty":
    case "not-empty": {
      const [_, ...restConfig] = whereClause;
      const oppositeOperator =
        whereOperator === "is-empty" ? "not-empty" : "is-empty";
      const oppositeConfig: EmptyOperatorConfig | NotEmptyOperatorConfig = [
        oppositeOperator,
        ...restConfig,
      ];
      return processChildFn(oppositeConfig, getFieldOrValueSql, dialect);
    }

    default: {
      console.warn('Unknown child where clause for "not" clause', whereClause);
      return "";
    }
  }
};
