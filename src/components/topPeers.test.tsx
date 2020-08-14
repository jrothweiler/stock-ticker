import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitForElement,
} from "@testing-library/react";
import React from "react";
import { TopPeers } from "./topPeers";

const mockFn = jest.fn();
jest.mock("./componentHooks/usePeersSelector", () => ({
  usePeersSelector: () => {
    return ["MSFT", "AMZN", "AAPL", "GOOGL"];
  },
}));

jest.mock("./componentHooks/useSearchSymbol", () => ({
  useSearchSymbol: () => mockFn,
}));

describe("Top Peers component", () => {
  beforeEach(async () => {
    render(<TopPeers />);
    await waitForElement(() => screen.getByText("TOP PEERS"));
  });

  afterEach(cleanup);
  test("Top Peers are rendered properly", () => {
    const topPeersHeader = screen.getByText("TOP PEERS");
    expect(topPeersHeader).toBeInTheDocument();
    const ticker1 = screen.getByText("MSFT");
    expect(ticker1).toBeInTheDocument();
    const ticker2 = screen.getByText("AMZN");
    expect(ticker2).toBeInTheDocument();
    const ticker3 = screen.getByText("AAPL");
    expect(ticker3).toBeInTheDocument();
    const ticker4 = screen.getByText("GOOGL");
    expect(ticker4).toBeInTheDocument();
  });

  test("Clicking on Top Peers tickers redirects properly", () => {
    const stockTicker = screen.getByText("MSFT");
    fireEvent.click(stockTicker);

    expect(mockFn).toHaveBeenCalled();
  });
});
