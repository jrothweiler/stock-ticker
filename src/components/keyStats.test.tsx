import React from "react";
import {
  render,
  cleanup,
  screen,
  waitForElement,
} from "@testing-library/react";
import { KeyStats } from "./keyStats";

jest.mock("./componentHooks/useQuoteSelector", () => ({
  useQuoteSelector: () => {
    return {
      previousClose: 1,
      low: 2,
      high: 3,
      latestVolume: 4,
      marketCap: 5,
      open: 6,
      week52Low: 7,
      week52High: 8,
      avgTotalVolume: 9,
    };
  },
}));
jest.mock("./componentHooks/useStatsSelector", () => ({
  useStatsSelector: () => {
    return {
      peRatio: 10,
      earningsPerShare: 11,
      dividendYield: 12,
    };
  },
}));

describe("Key Stats component", () => {
  beforeEach(async () => {
    render(<KeyStats />);
    await waitForElement(() => screen.getByText("Previous Close"));
  });

  test("Key stats labels are rendered", () => {
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
    const totalAvgVolumeText = screen.getByText("Total Avg. Volume");
    expect(totalAvgVolumeText).toBeInTheDocument();
    const earningsPerShareText = screen.getByText("Earnings Per Share");
    expect(earningsPerShareText).toBeInTheDocument();
    const dividendYieldText = screen.getByText("Dividend & Yield");
    expect(dividendYieldText).toBeInTheDocument();
  });

  test("Key stats data is rendered", () => {
    const previousCloseValue = screen.getByText("1");
    expect(previousCloseValue).toBeInTheDocument();
    const dayRangeValue = screen.getByText("2 - 3");
    expect(dayRangeValue).toBeInTheDocument();
    const volumeValue = screen.getByText("4");
    expect(volumeValue).toBeInTheDocument();
    const marketCapValue = screen.getByText("5");
    expect(marketCapValue).toBeInTheDocument();
    const peRatioValue = screen.getByText("10");
    expect(peRatioValue).toBeInTheDocument();
    const openValue = screen.getByText("6");
    expect(openValue).toBeInTheDocument();
    const week52RangeValue = screen.getByText("7 - 8");
    expect(week52RangeValue).toBeInTheDocument();
    const totalAvgVolumeValue = screen.getByText("9");
    expect(totalAvgVolumeValue).toBeInTheDocument();
    const earningsPerShareValue = screen.getByText("11");
    expect(earningsPerShareValue).toBeInTheDocument();
    const dividendYieldValue = screen.getByText("1,200%");
    expect(dividendYieldValue).toBeInTheDocument();
  });
});
