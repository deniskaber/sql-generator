import { transpileEqualsNotEqualsOperator } from "./equals-not-equals";

describe('"=" operator', () => {
  it('generates "field = value" for config with 2 arguments', () => {
    expect(
      transpileEqualsNotEqualsOperator(["=", ["field", 3], 5], {
        3: "test",
      })
    ).toBe("test = 5");
  });

  it('generates "field IN (value1, value2)" for config with 3 arguments', () => {
    expect(
      transpileEqualsNotEqualsOperator(["=", ["field", 3], 5, 6], {
        3: "test",
      })
    ).toBe("test IN (5, 6)");
  });

  it("handles many arguments correctly", () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["=", ["field", 3], 5, 6, "abc", 10, "test"],
        {
          3: "test",
        }
      )
    ).toBe("test IN (5, 6, 'abc', 10, 'test')");
  });
});

describe('"!=" operator', () => {
  it('generates "field = value" for config with 2 arguments', () => {
    expect(
      transpileEqualsNotEqualsOperator(["!=", ["field", 3], 5], {
        3: "test",
      })
    ).toBe("test != 5");
  });

  it('generates "field IN (value1, value2)" for config with 3 arguments', () => {
    expect(
      transpileEqualsNotEqualsOperator(["!=", ["field", 3], 5, 6], {
        3: "test",
      })
    ).toBe("test NOT IN (5, 6)");
  });

  it("handles many arguments correctly", () => {
    expect(
      transpileEqualsNotEqualsOperator(
        ["!=", ["field", 3], 5, 6, "abc", 10, "test"],
        {
          3: "test",
        }
      )
    ).toBe("test NOT IN (5, 6, 'abc', 10, 'test')");
  });
});
