import React from "react";
import {
  render,
  cleanup,
  screen,
  prettyDOM,
  waitForElement,
  fireEvent,
} from "@testing-library/react";
import App from "../App";
import { TopPeers } from "./topPeers";

jest.mock("./componentHooks/usePeersSelector", () => ({
  usePeersSelector: () => {
    return ["MSFT", "AMZN", "AAPL", "GOOGL"];
  },
}));

jest.mock("./componentHooks/searchSymbol", () => ({
  searchSymbol: () => {
    return ["MSFT", "AMZN", "AAPL", "GOOGL"];
  },
}));
describe("Top Peers component", () => {
  let app;

  beforeEach(async () => {
    const { container } = render(<TopPeers />);
    app = container;

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
});
