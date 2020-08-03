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
import { usePeersSelector } from "./componentHooks/usePeersSelector";

jest.mock("./componentHooks/usePeersSelector", () => ({
  usePeersSelector: () => {
    return ["MSFT", "AMZN", "AAPL", "GOOGL"];
  },
}));

describe("Top Peers component", () => {
  let app;

  beforeEach(async () => {
    const { container } = render(<TopPeers />);
    app = container;

    await waitForElement(() => screen.getByText("US MARKET"));
    console.log(prettyDOM(app));
  });

  afterEach(cleanup);

  test("Top Peers are rendered properly", () => {
    const keyStatsHeader = screen.getByText("US MARKET");
    expect(keyStatsHeader).toBeInTheDocument();
  });
});
