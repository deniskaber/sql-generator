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

console.log(
  generateSql("postgres", fields, { where: ["=", ["field", 4], 25, 26, 27] })
);

console.log(
  generateSql("postgres", fields, { where: ["=", ["field", 2], "cam"] })
);
