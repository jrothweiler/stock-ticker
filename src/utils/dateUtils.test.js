import { formatDate } from "./dateUtils";

describe("formatDate", () => {
  it("formats dates in the expected structure", () => {
    let exampleDateTimestamp = 1596480448000; // August 3rd, 2020 2:47 EST
    expect(formatDate(exampleDateTimestamp)).toBe("Aug 3, 2020 6:47 PM UTC");
  });
});
