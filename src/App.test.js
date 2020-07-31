import React from "react";
import {
  render,
  screen,
  waitForElement,
  fireEvent,
} from "@testing-library/react";
import App from "./App";

// Integration tests for the general application experience

describe("Application", () => {
  let app;
  beforeEach(async () => {
    const { container } = render(<App />);
    app = container;
    await waitForElement(() => screen.getByText("Apple, Inc."));
  });

  test("Renders all the expected sections of the experience", () => {
    // test that the major sections all appear as headers (banner role)
    let headers = screen.getAllByRole("banner");
    let headersText = headers.map((header) => header.textContent);
    [
      "LATEST NEWS",
      "COMPANY OVERVIEW",
      "KEY STATS",
      "TOP PEERS",
    ].forEach((title) => expect(headersText).toContain(title));

    expect(screen.getByText("US MARKET")).toBeInTheDocument(); // footer
  });
});
