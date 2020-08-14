import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { PriceDisplay } from "./priceDisplay";
import { Text } from "./generics/text";
import { useIndexSelector } from "./componentHooks/useIndexSelector";
import type { StyleProps } from "../types/styleTypes";

export const Footer = (props: StyleProps) => {
  const indexes = useIndexSelector();
  return (
    <DisplayWrapper className="footer" {...props}>
      <DisplayWrapper ml="1.0rem" paddingTop="0.6rem" mb="0.5rem">
        <Text variant="primary" size="small" fontWeight="lighter">
          US MARKET
        </Text>
      </DisplayWrapper>
      <DisplayWrapper
        ml="1.0rem"
        paddingBottom="0.6rem"
        variant="flexRow"
        justifyContent="flex-start"
      >
        {indexes &&
          indexes.map((index) => (
            <PriceDisplay
              key={index.symbol}
              data={index}
              ticker={index.symbol}
              size="medium"
              mr="24px"
            />
          ))}
      </DisplayWrapper>
    </DisplayWrapper>
  );
};
