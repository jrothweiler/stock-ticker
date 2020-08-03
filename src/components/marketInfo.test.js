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
import { MarketInfo } from "./marketInfo";
import { useQuoteSelector } from "./componentHooks/useQuoteSelector";

jest.mock("./componentHooks/useQuoteSelector", () => ({
  useQuoteSelector: jest.fn(),
}));

describe("Market Info component", () => {
  describe("market status", () => {
    describe("when the market is open", () => {
      beforeEach(async () => {
        useQuoteSelector.mockReturnValueOnce({
          isUSMarketOpen: true,
          latestUpdate: 1596480448000,
        });
      });

      it("shows Market Open", async () => {
        render(<MarketInfo />);
        await waitForElement(() => screen.getByText("Market Open"));
      });
    });

    describe("when the market is closed", () => {
      beforeEach(async () => {
        useQuoteSelector.mockReturnValueOnce({
          isUSMarketOpen: false,
          latestUpdate: 1596480448000,
        });
      });

      it("shows Market Closed", async () => {
        render(<MarketInfo />);
        await waitForElement(() => screen.getByText("Market Closed"));
      });
    });
  });
});
