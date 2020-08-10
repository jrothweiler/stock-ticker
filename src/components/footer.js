import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { PriceDisplay } from "./priceDisplay";
import { Text } from "./generics/text";
import { useIndexSelector } from "./componentHooks/useIndexSelector";

export const Footer = (props) => {
  //const indexes = useIndexSelector();
  const indexes = [
    { symbol: "MSFT", latestPrice: 10.09, open: 250 },
    { symbol: "AMZN", latestPrice: 3000, open: 2900 },
    { symbol: "GOOGL", latestPrice: 1500, open: 1450 },
  ];
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
