import React from "react";
import { useQuoteSelector } from "./componentHooks/useQuoteSelector";
import { Text } from "./generics/text";
import { DisplayWrapper } from "./generics/displayWrapper";
import { mdiWeatherSunny } from "@mdi/js";
import { mdiWeatherNight } from "@mdi/js";
import Icon from "@mdi/react";
import { formatDate } from "../utils/dateUtils";
import { QuoteData } from "../types";

export const MarketInfo = () => {
  const quoteData: QuoteData | null = useQuoteSelector();
  if (!quoteData) {
    return null;
  }
  const marketOpen: boolean = quoteData.isUSMarketOpen;
  const latestTime: number = quoteData.latestUpdate;
  const latestTimeString = formatDate(latestTime);

  return (
    quoteData && (
      <DisplayWrapper variant="flexRow">
        <Text
          variant="secondary"
          size="small"
          height="1.5rem"
          lineHeight="1.5rem"
          mr="16px"
          display={["none", "none", "inline-block"]}
        >
          Real-Time Price as of {latestTimeString}
        </Text>
        <Icon
          path={marketOpen ? mdiWeatherSunny : mdiWeatherNight}
          size="1.5rem"
          color="#ffbb5e"
        />
        <Text
          variant="primary"
          size="small"
          ml="4px"
          height="1.5rem"
          lineHeight="1.5rem"
        >
          Market {marketOpen ? "Open" : "Closed"}
        </Text>
      </DisplayWrapper>
    )
  );
};
