import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import { StatWrapper } from "./generics/statWrapper";
import { useStatsSelector } from "./componentHooks/useStatsSelector";
import { useQuoteSelector } from "./componentHooks/useQuoteSelector";
import { StyledSystem, StatsData, QuoteData } from "../types";

export const KeyStats = (props: StyledSystem) => {
  //Call necessary selectors for display data
  const stats = useStatsSelector();
  const quote = useQuoteSelector();

  if (!quote || !stats) {
    return null;
  }
  function rowDataToJSX(labels: string[], values: string[]) {
    return (
      <DisplayWrapper width={["100%", "46%"]}>
        {labels.map((label: string, indx: number) => (
          <StatWrapper key={label}>
            <Text variant="statLabel">{label}</Text>
            <Text variant="statValue">{values[indx]}</Text>
          </StatWrapper>
        ))}
      </DisplayWrapper>
    );
  }

  const rowLabelsFirstColumn = [
    "Previous Close",
    "Day Range",
    "Volume",
    "Market Cap",
    "P/E Ratio",
  ];

  const rowValuesFirstColumn = [
    quote.previousClose.toLocaleString("en"),
    `${quote.low.toLocaleString("en")} - ${quote?.high.toLocaleString("en")}`,
    quote.latestVolume.toLocaleString("en"),
    quote.marketCap.toLocaleString("en"),
    stats.peRatio.toLocaleString("en"),
  ];

  const rowLabelsSecondColumn = [
    "Open",
    "52 Week Range",
    "Total Avg. Volume",
    "Earnings Per Share",
    "Dividend & Yield",
  ];

  const rowValuesSecondColumn = [
    quote?.open.toLocaleString("en"),
    `${quote?.week52Low.toLocaleString(
      "en"
    )} - ${quote?.week52High.toLocaleString("en")}`,
    quote?.avgTotalVolume.toLocaleString("en"),
    stats?.earningsPerShare.toLocaleString("en"),
    stats?.dividendYield
      ? `${(stats?.dividendYield * 100).toLocaleString("en")}%`
      : "N/A",
  ];

  return (
    <DisplayWrapper {...props}>
      <TitleHeader>KEY STATS</TitleHeader>
      <DisplayWrapper variant="flexRow">
        {rowDataToJSX(rowLabelsFirstColumn, rowValuesFirstColumn)}
        {rowDataToJSX(rowLabelsSecondColumn, rowValuesSecondColumn)}
      </DisplayWrapper>
    </DisplayWrapper>
  );
};
