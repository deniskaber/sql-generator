import { generateSql } from "./sql-generator";

const fields = { 1: "id", 2: "name", 3: "date_joined", 4: "age" };

console.log(
  generateSql("postgres", fields, {
    where: ["=", ["field", 3], null],
  })
);

console.log(
  generateSql("postgres", fields, { where: [">", ["field", 4], 35] })
);
