import { generateSql } from "./sql-generator";

const fields = { 1: "id", 2: "name", 3: "date_joined", 4: "age" };

const result = generateSql("postgres", fields, {
  where: ["=", ["field", 3], null],
});

console.log(result);
