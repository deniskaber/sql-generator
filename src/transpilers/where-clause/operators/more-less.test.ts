import { transpileMoreOrLessOperator } from "./more-less";

describe('">" operator', () => {
  it('generates "field > value" for correct config', () => {
    expect(
      transpileMoreOrLessOperator([">", ["field", 3], 5], {
        3: "test",
      })
    ).toBe("test > 5");
  });
});

describe('"<" operator', () => {
  it('generates "field < value" for correct config', () => {
    expect(
      transpileMoreOrLessOperator(["<", ["field", 3], 5], {
        3: "test",
      })
    ).toBe("test < 5");
  });
});
