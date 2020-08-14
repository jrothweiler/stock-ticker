import {
  cleanup,
  render,
  screen,
  waitForElement,
} from "@testing-library/react";
import React from "react";
import { PriceDisplay } from "./priceDisplay";

let mockStockData = {
  symbol: "symbol",
  previousClose: 0,
  week52High: 9,
  week52Low: 8,
  high: 7,
  low: 6,
  latestPrice: 300.0,
  marketCap: 4,
  latestVolume: 3,
  open: 200.0,
  avgTotalVolume: 1,
  isUSMarketOpen: true,
  latestUpdate: 1,
};

describe("Price Display component", () => {
  beforeEach(async () => {
    render(<PriceDisplay data={mockStockData} ticker={"MSFT"} />);
    waitForElement(() => screen.getByText("MSFT"));
  });

  afterEach(cleanup);

  test("Correct price and percent difference is displayed properly ", () => {
    const priceDisplay = screen.getByText("300");
    expect(priceDisplay).toBeInTheDocument();
    const valueChangeDisplay = screen.getByText("100.00");
    expect(valueChangeDisplay).toBeInTheDocument();
    const percentChangeDisplay = screen.getByText("50.00");
    expect(percentChangeDisplay).toBeInTheDocument();
  });
});
