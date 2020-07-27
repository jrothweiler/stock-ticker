import React from "react";
import { statsSelector } from "../selectors/statsSelector";
import { quoteSelector } from "../selectors/quoteSelector";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import { StatWrapper } from "./generics/statWrapper";
import { useDispatch, useSelector } from "react-redux";
import { selectIsMobileLayout } from '../selectors/layoutSelectors';

export const KeyStats = (props) => {
  const isMobile = useSelector(selectIsMobileLayout);
  const widthPercent = isMobile ? "100%" : "46%";

  const stats = useSelector(statsSelector);
  const quote = useSelector(quoteSelector);
  return (
    <DisplayWrapper height={props.height}>
      <TitleHeader>KEY STATS</TitleHeader>
      <DisplayWrapper variant="flexRow">
        <DisplayWrapper width={widthPercent}>
          {quote && (
            <StatWrapper>
              <Text variant="statLabel">Previous Close</Text>
              <Text variant="statValue">
                {quote.previousClose.toLocaleString("en")}
              </Text>
            </StatWrapper>
          )}
          {quote && (
            <StatWrapper>
              <Text variant="statLabel">Day Range</Text>
              <Text variant="statValue">
                {quote.low.toLocaleString("en")} - {quote.high.toLocaleString("en")}
              </Text>
            </StatWrapper>
          )}
          {quote && (
            <StatWrapper>
              <Text variant="statLabel">Volume</Text>
              <Text variant="statValue">{quote.latestVolume.toLocaleString("en")}</Text>
            </StatWrapper>
          )}
          {quote && (
            <StatWrapper>
              <Text variant="statLabel">Market Cap</Text>
              <Text variant="statValue">
                {quote.marketCap.toLocaleString("en")}
              </Text>
            </StatWrapper>
          )}
          {stats && (
            <StatWrapper>
              <Text variant="statLabel">P/E Ratio</Text>
              <Text variant="statValue">
                {stats.peRatio.toLocaleString("en")}
              </Text>
            </StatWrapper>
          )}
        </DisplayWrapper>
        <DisplayWrapper width={widthPercent}>
          {quote && (
            <StatWrapper>
              <Text variant="statLabel">Open</Text>
              <Text variant="statValue">{quote.open.toLocaleString("en")}</Text>
            </StatWrapper>
          )}
          {quote && (
            <StatWrapper>
              <Text variant="statLabel">52 Week Range</Text>
              <Text variant="statValue">
                {" "}
                {quote.week52Low.toLocaleString("en")} -{" "}
                {quote.week52High.toLocaleString("en")}
              </Text>
            </StatWrapper>
          )}
          {quote && (
            <StatWrapper>
              <Text variant="statLabel">Total Avg Volume</Text>
              <Text variant="statValue">
                {quote.avgTotalVolume.toLocaleString("en")}
              </Text>
            </StatWrapper>
          )}
          {stats && (
            <StatWrapper>
              <Text variant="statLabel">Earnings Per Share</Text>
              <Text variant="statValue">
                {stats.earningsPerShare.toLocaleString("en")}
              </Text>
            </StatWrapper>
          )}
          {stats && (
            <StatWrapper>
              <Text variant="statLabel">Dividend & Yield</Text>
              <Text variant="statValue">
                {stats.dividendYield ? `${(stats.dividendYield * 100).toLocaleString("en")}%` : "N/A"}
              </Text>
            </StatWrapper>
          )}
        </DisplayWrapper>
      </DisplayWrapper>
      
    </DisplayWrapper>
  );
};
