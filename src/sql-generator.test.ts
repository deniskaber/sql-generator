import {generateSql} from "./sql-generator";

describe('generateSql', () => {
    const fields = { 1: "id", 2: "name", 3: "date_joined", 4: "age" };

    it('works', () => {
        const result = generateSql("postgres", fields, {"where": ["=", ["field", 3], null]})
        expect(result).toBe('SELECT * FROM data WHERE date_joined IS NULL')
    })
})