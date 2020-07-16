import React from "react";
import { statsSelector} from "../selectors/statsSelector";
import { quoteSelector} from "../selectors/quoteSelector";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import {StatWrapper} from "./generics/statWrapper";
import { useDispatch, useSelector } from "react-redux";

export const KeyStats = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
    const stats = useSelector(statsSelector);
    const quote = useSelector(quoteSelector);
  return (
    <DisplayWrapper width="70%" mr="auto" ml="auto">
        <TitleHeader>Key Stats</TitleHeader>
        <DisplayWrapper display="inline-block" width="46%" mr="4%">
            {quote && 
            <StatWrapper>
                <Text variant="statLabel">Previous Close</Text>
                <Text variant="statValue">{quote.previousClose.toLocaleString('en')}</Text>
            </StatWrapper>}
            {quote &&
            <StatWrapper>
                <Text variant="statLabel">Day Range</Text>
                <Text variant="statValue">{quote.low} - {quote.high}</Text>}
            </StatWrapper>}
            {quote && 
            <StatWrapper>
                <Text variant="statLabel">Volume</Text>
                <Text variant="statValue">{quote.latestVolume}</Text>}
            </StatWrapper>}
            {quote && 
            <StatWrapper>
                <Text variant="statLabel">Market Cap</Text>
                <Text variant="statValue">{quote.marketCap.toLocaleString('en')}</Text>
            </StatWrapper>}
            {stats && 
            <StatWrapper>
                <Text variant="statLabel">P/E Ratio</Text>
                <Text variant="statValue">{stats.peRatio.toLocaleString('en')}</Text>
            </StatWrapper>}
        </DisplayWrapper>
        <DisplayWrapper display="inline-block" width="46%" ml="4%">
            {quote && 
            <StatWrapper>
                <Text variant="statLabel">Open</Text>
                <Text display="statValue">{quote.open}</Text>
            </StatWrapper>}
            {quote && 
            <StatWrapper>
                <Text variant="statLabel">52 Week Range</Text>
                <Text variant="statValue"> {quote.week52Low.toLocaleString('en')} - {quote.week52High.toLocaleString('en')}</Text>
            </StatWrapper>}
            {quote && 
                <StatWrapper>
                    <Text variant="statLabel">Total Avg Volume</Text>
                    <Text variant="statValue">{quote.avgTotalVolume.toLocaleString('en')}</Text>
                </StatWrapper>}
            {stats && 
                <StatWrapper>
                    <Text variant="statLabel">Earnings Per Share</Text>
                    <Text variant="statValue">{stats.earningsPerShare.toLocaleString('en')}</Text>
                </StatWrapper>}
            {stats && 
                <StatWrapper>
                    <Text variant="statLabel">Dividend& Yield</Text>
                    <Text variant="statValue">{(stats.dividendYield*100).toLocaleString('en')}%</Text>}
                </StatWrapper>}
        </DisplayWrapper>
    </DisplayWrapper>
    );
};
