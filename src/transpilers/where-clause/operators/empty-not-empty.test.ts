import { transpileEmptyNotEmptyOperator } from "./empty-not-empty";

describe('"is-empty" operator', () => {
  it('generates "IS NULL" for correct config', () => {
    expect(
      transpileEmptyNotEmptyOperator(["is-empty", ["field", 3]], {
        3: "test",
      })
    ).toBe("test IS NULL");
  });
});

describe('"not-empty" operator', () => {
  it('generates "IS NOT NULL" for correct config', () => {
    expect(
      transpileEmptyNotEmptyOperator(["not-empty", ["field", 3]], {
        3: "test",
      })
    ).toBe("test IS NOT NULL");
  });
});
