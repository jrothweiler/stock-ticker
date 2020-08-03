import React from "react";
import { useCompanyBadgeInfo } from "./componentHooks/useCompanyBadgeInfo";
import { DisplayWrapper } from "./generics/displayWrapper";
import { Text } from "./generics/text";

export const MarketInfo = () => {
  return (
    <Text variant="primary" size="small">
      Market is open
    </Text>
  );
};
