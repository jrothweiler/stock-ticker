import React from "react";
import { render, screen } from "@testing-library/react";
import { MarketInfo } from "./marketInfo";
import { useQuoteSelector } from "./componentHooks/useQuoteSelector";
import { mocked } from "ts-jest/utils";

jest.mock("./componentHooks/useQuoteSelector", () => ({
  useQuoteSelector: jest.fn(),
}));

const mockUseQuoteSelector = mocked(useQuoteSelector);

let mockStockData = {
  symbol: "symbol",
  previousClose: 0,
  week52High: 9,
  week52Low: 8,
  high: 7,
  low: 6,
  latestPrice: 5,
  marketCap: 4,
  latestVolume: 3,
  open: 2,
  avgTotalVolume: 1,
  isUSMarketOpen: true,
  latestUpdate: 1596480448000,
};

describe("Market Info component", () => {
  describe("market status", () => {
    describe("when the market is open", () => {
      beforeEach(async () => {
        mockUseQuoteSelector.mockReturnValueOnce(mockStockData);
      });

      it("shows Market Open", async () => {
        render(<MarketInfo />);
        expect(screen.getByText("Market Open")).toBeInTheDocument();
      });
    });

    describe("when the market is closed", () => {
      beforeEach(async () => {
        mockUseQuoteSelector.mockReturnValueOnce({
          ...mockStockData,
          isUSMarketOpen: false,
        });
      });

      it("shows Market Closed", async () => {
        render(<MarketInfo />);
        expect(screen.getByText("Market Closed")).toBeInTheDocument();
      });
    });
  });

  describe("Latest Update Text", () => {
    beforeEach(async () => {
      mockUseQuoteSelector.mockReturnValueOnce(mockStockData);

      render(<MarketInfo />);
    });

    it("Shows the latest update disclaimer", () => {
      expect(
        screen.getByText("Real-Time Price as of Aug 3, 2020 6:47 PM UTC")
      ).toBeInTheDocument();
    });
  });
});
