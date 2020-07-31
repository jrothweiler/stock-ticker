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
import { KeyStats } from "./keyStats";
import { useQuoteSelector } from "./componentHooks/useCompanySelector";
import { useStatSelector } from "./componentHooks/useTickerSelector";

jest.mock("./componentHooks/useQuoteSelector", () => ({
  useQuoteSelector: () => {
    return {
     previousClose: 100,
     low: 50,
     high: 200,
     latestVolume: 100,
     marketCap: 1000,
     open: 75,
     week52Low: 30,
     week52High: 250,
     avgTotalVolume: 150
        }
    },
}));
jest.mock("./componentHooks/useStatsSelector", () => ({
  useStatsSelector: () => {
    return {
        peRatio: 10,
        earningsPerShare: 1,
        dividendYield: 0.5
    }
  },
}));

describe("Key Stats component", () => {
  let app;

  beforeEach(async () => {
    const { container } = render(<KeyStats />);
    app = container;
    
    await waitForElement(() => screen.getByText("Previous Close"));
    console.log(prettyDOM(app));
  });

  afterEach(cleanup);

  test("Key stats data is rendered", () => {
    const keyStatsHeader = screen.getByText("KEY STATS");
    expect(keyStatsHeader).toBeInTheDocument();
    const previousCloseText = screen.getByText("Previous Close");
    expect(previousCloseText).toBeInTheDocument();
    const dayRangeText = screen.getByText("Day Range");
    expect(dayRangeText).toBeInTheDocument();
    const volumeText = screen.getByText("Volume");
    expect(volumeText).toBeInTheDocument();
    const marketCapText = screen.getByText("Market Cap");
    expect(marketCapText).toBeInTheDocument();
    const peRatioText = screen.getByText("P/E Ratio");
    expect(peRatioText).toBeInTheDocument();
    const openText = screen.getByText("Open");
    expect(openText).toBeInTheDocument();
    const week52RangeText = screen.getByText("52 Week Range");
    expect(week52RangeText).toBeInTheDocument();
    const totalAvgVolumeText = screen.getByText("Total Avg Volume");
    expect(totalAvgVolumeText).toBeInTheDocument();
    const earningsPerShareText = screen.getByText("Earnings Per Share");
    expect(earningsPerShareText).toBeInTheDocument();
    const dividendYieldText = screen.getByText("Dividend & Yield");
    expect(dividendYieldText).toBeInTheDocument();
  });

});
