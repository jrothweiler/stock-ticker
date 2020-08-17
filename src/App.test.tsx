import React from "react";
import {
  render,
  screen,
  waitForElement,
  fireEvent,
} from "@testing-library/react";
import App from "./App";
import socketIOClient from "socket.io-client";

// mock the socket io client with an object that resembles a socket
jest.mock("socket.io-client", () => {
  const emit = jest.fn();
  // keep track in this mock of any callbacks added through 'on'
  const eventHandlers: { [actionName: string]: (...args: any[]) => void } = {};
  const on = jest.fn((event, cb) => {
    eventHandlers[event] = cb;
  });

  // test helper that simulates the socket receiving an event from the server
  // side of the socket, calling the appropriate callback
  const receiveEvent = (event: string, ...args: any[]) => {
    eventHandlers[event](...args);
  };
  const socket = { emit, on, receiveEvent };
  return jest.fn(() => socket);
});

interface TestSocket {
  emit: jest.Mock<void>;
  on: jest.Mock<void>;
  receiveEvent: jest.Mock<void>;
}

// we do a forced conversion here because the TS compiler does not know about the jest.mock,
// and we build a mock object which has methods the main socket type doesn't for testing purposes,
// so the two arent compatible
const mockedSocketClient = (socketIOClient as unknown) as jest.Mock<TestSocket>;

// Integration tests for the general application experience
describe("Application", () => {
  beforeEach(async () => {
    render(<App />);
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

    // basic tests that each section's data appears in the layout,
    // verifying that data is passed into the child components correctly.
    // Where the data is specifically rendered is covered by unit tests
    expect(screen.getByText("Apple headline")).toBeInTheDocument(); // news
    expect(screen.getByText("1,686,473,219,033")).toBeInTheDocument(); // key stats
    expect(screen.getByText("Apple description")).toBeInTheDocument(); // company overview
    expect(screen.getByText("PHQ")).toBeInTheDocument(); // company overview
    expect(screen.getByText("387.46")).toBeInTheDocument(); // big price
    expect(screen.getByText("NASDAQ")).toBeInTheDocument(); // company badges
    expect(screen.getByText("Market Open")).toBeInTheDocument(); // Market Info
    expect(
      screen.getByText("Real-Time Price as of Aug 3, 2020 6:47 PM UTC")
    ).toBeInTheDocument(); // market info
    expect(screen.getByText("MSFT")).toBeInTheDocument(); //Footer info
    expect(screen.getByText("10.09")).toBeInTheDocument(); //Footer info
  });

  test("a socket connection is made", () => {
    expect(mockedSocketClient).toHaveBeenCalled();
  });

  test("responds to real time quote data events by updating UI", () => {
    // at first, it shows the mock data's price
    expect(screen.getByText("387.46")).toBeInTheDocument();
    expect(screen.queryByText("400.46")).not.toBeInTheDocument();

    mockedSocketClient().receiveEvent("realTimeQuoteData", {
      symbol: "AAPL",
      previousClose: "479.47",
      week52High: "517.16",
      week52Low: "297.51",
      high: "499.26",
      low: "386.07",
      latestPrice: "400.46",
      marketCap: 1686473219030,
      latestVolume: 115510,
      open: "492.56",
      avgTotalVolume: 35008228,
    });

    // after the event, the UI reflects the new data
    expect(screen.queryByText("387.46")).not.toBeInTheDocument();
    expect(screen.getByText("400.46")).toBeInTheDocument();
  });

  test("searched symbols send newSymbol events over socket", async () => {
    expect(mockedSocketClient().emit).toHaveBeenCalledWith("newSymbol", "AAPL");
    expect(mockedSocketClient().emit).not.toHaveBeenCalledWith(
      "newSymbol",
      "WORK"
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "WORK" } });
    fireEvent.submit(input);

    await waitForElement(() => screen.getByText("Slack Technologies, Inc."));

    expect(mockedSocketClient().emit).toHaveBeenCalledWith("newSymbol", "WORK");
  });

  // TODO: do integration test of footer index searches once we consistently hook that up to real data.
});
