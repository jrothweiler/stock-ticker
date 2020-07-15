import React from "react";
import { statsSelector} from "../selectors/statsSelector";
import {quoteSelector} from "../selectors/quoteSelector";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import { StatLine } from "./generics/statLine"
import { useDispatch, useSelector } from "react-redux";

export const KeyStats = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
    const stats = useSelector(statsSelector);
    const quote = useSelector(quoteSelector);
  return (
    <DisplayWrapper width="70%" mr="auto" ml="auto">
        <TitleHeader>Key Stats</TitleHeader>
        <DisplayWrapper display="inline-block" width="50%" mr="auto" ml="auto">
            {quote && <StatLine>Previous Close {quote.previousClose}</StatLine>}
            {quote && <StatLine>Day Range {quote.low} - {quote.high}</StatLine>}
            {quote && <StatLine>Volume {quote.latestVolume}</StatLine>}
            {quote && <StatLine>Market Cap {quote.marketCap}</StatLine>}
            {stats && <StatLine>P/E Ratio {stats.peRatio}</StatLine>}
        </DisplayWrapper>
        <DisplayWrapper display="inline-block" width="50%" mr="auto" ml="auto">
            {quote && <StatLine>Open {quote.open}</StatLine>}
            {quote && <StatLine>52 Week Range {quote.week52Low} - {quote.week52High}</StatLine>}
            {quote && <StatLine>Total Avg Volume {quote.avgTotalVolume}</StatLine>}
            {stats && <StatLine>Earnings Per Share {stats.earningsPerShare}</StatLine>}
            {stats && <StatLine>Dividend& Yield {stats.dividendYield}</StatLine>}
        </DisplayWrapper>
    </DisplayWrapper>
    );
};
