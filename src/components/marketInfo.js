import React from "react";
import { useQuoteSelector } from "./componentHooks/useQuoteSelector";
import { Text } from "./generics/text";
import { DisplayWrapper } from "./generics/displayWrapper";
import { mdiWeatherSunny } from "@mdi/js";
import { mdiWeatherNight } from "@mdi/js";
import Icon from "@mdi/react";
import { formatDate } from "../utils/dateUtils";

export const MarketInfo = () => {
  const quoteData = useQuoteSelector();
  const marketOpen = quoteData.isUSMarketOpen;
  const latestTime = quoteData.latestUpdate;
  const latestTimeString = formatDate(latestTime);

  return (
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
  );
};
