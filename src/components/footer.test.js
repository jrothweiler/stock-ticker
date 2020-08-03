import React from "react";
import * as redux from "react-redux";
import {
  render,
  cleanup,
  screen,
  prettyDOM,
  waitForElement,
  fireEvent,
} from "@testing-library/react";
import App from "../App";
import { Footer } from "./footer";
import { useIndexSelector } from "./componentHooks/useIndexSelector";

jest.mock("./componentHooks/useIndexSelector", () => ({
  useIndexSelector: () => {
    return [
      { symbol: "MSFT", latestPrice: 200, open: 250 },
      { symbol: "AMZN", latestPrice: 3000, open: 2900 },
      { symbol: "GOOGL", latestPrice: 1500, open: 1450 },
    ];
  },
}));

describe("Footer component", () => {
  let app;

  beforeEach(async () => {
    const { container } = render(<LatestNews />);
    app = container;
    await waitForElement(() => screen.getByText("US MARKET"));
  });

  afterEach(cleanup);

  test("Correct Footer data is rendered", () => {
    const footerHeader = screen.getByText("US MARKET");
    expect(footerHeader).toBeInTheDocument();
  });
});
