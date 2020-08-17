import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { PriceDisplay } from "./priceDisplay";
import { Text } from "./generics/text";
import { useIndexSelector } from "./componentHooks/useIndexSelector";
import { StyledSystem, QuoteData } from "../types";

interface Props {
  height: string;
  width: string;
}
export const Footer = (props: StyledSystem) => {
  const indexes = useIndexSelector();
  //const indexes = [];
  return (
    <DisplayWrapper
      className="footer"
      width={props.width}
      height={props.height}
    >
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
          indexes.map((index: QuoteData) => (
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
