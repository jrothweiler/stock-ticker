import React from "react";
import {
  render,
  screen,
  prettyDOM,
  waitForElement,
  fireEvent,
  within,
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
    expect(screen.getByText("LATEST NEWS")).toBeInTheDocument();
  });
});
