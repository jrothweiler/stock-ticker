import React from "react";
import { useQuoteSelector } from "./componentHooks/useQuoteSelector";
import { Text } from "./generics/text";
import { DisplayWrapper } from "./generics/displayWrapper";
import { mdiWeatherSunny } from "@mdi/js";
import { mdiWeatherNight } from "@mdi/js";
import Icon from "@mdi/react";

export const MarketInfo = () => {
  let marketOpen = useQuoteSelector().isUSMarketOpen;

  return (
    <DisplayWrapper variant="flexRow">
      <Icon
        className="searchIcon"
        path={marketOpen ? mdiWeatherSunny : mdiWeatherNight}
        size={1.0}
        color="#ffbb5e"
      />
      <Text variant="primary" size="small" ml="4px">
        Market {marketOpen ? "Open" : "Closed"}
      </Text>
    </DisplayWrapper>
  );
};
