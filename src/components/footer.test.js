import React from "react";
import {
  render,
  cleanup,
  screen,
  waitForElement,
} from "@testing-library/react";
import { Footer } from "./footer";

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
  beforeEach(async () => {
    render(<Footer />);
    await waitForElement(() => screen.getByText("US MARKET"));
  });

  test("Correct Footer data is rendered", () => {
    const footerHeader = screen.getByText("US MARKET");
    expect(footerHeader).toBeInTheDocument();
    const symbol1 = screen.getByText("MSFT");
    expect(symbol1).toBeInTheDocument();
    const symbol2 = screen.getByText("AMZN");
    expect(symbol2).toBeInTheDocument();
    const symbol3 = screen.getByText("GOOGL");
    expect(symbol3).toBeInTheDocument();
  });
});
