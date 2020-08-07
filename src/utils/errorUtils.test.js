import { formatErrorMessage } from "./errorUtils";

let exampleNotFoundError = {
  status: 404,
  statusText: "Not Found",
};

let exampleOtherError = {
  status: 490,
  statusText: "Something else bad happened",
};

describe("formatErrorMessages", () => {
  it("formats 404 errors", () => {
    expect(formatErrorMessage("AAPL", exampleNotFoundError)).toEqual(
      "Symbol AAPL does not exist"
    );
  });

  it("returns the server message for other errors", () => {
    expect(formatErrorMessage("AAPL", exampleOtherError)).toEqual(
      "Something else bad happened"
    );
  });
});
