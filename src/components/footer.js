import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { PriceDisplay } from "./priceDisplay";
import { Text } from "./generics/text";
import { indexSelector } from "../selectors/indexSelector";
import { useSelector } from "react-redux";

export const Footer = (props) => {
  //const indexes = useSelector(indexSelector);
  const indexes = [
    { symbol: "MSFT", latestPrice: 200, open: 250 },
    { symbol: "AMZN", latestPrice: 3000, open: 2900 },
    { symbol: "GOOGL", latestPrice: 1500, open: 1450 },
  ];
  return (
    <DisplayWrapper
      className="footer"
      width={props.width}
      height={props.height}
    >
      <DisplayWrapper ml="1.0rem" mt="0.6rem" mb="0.5rem">
        <Text variant="primary" size="small" fontWeight="lighter">
          US MARKET
        </Text>
      </DisplayWrapper>
      <DisplayWrapper ml="1.0rem" mb="0.6rem" variant="flexRow">
        {indexes &&
          indexes.map((index) => (
            <PriceDisplay data={index} ticker={index.symbol} size="medium" />
          ))}
      </DisplayWrapper>
    </DisplayWrapper>
  );
};
