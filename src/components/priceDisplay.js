import React from "react";
import { Text } from "./generics/text";
import { quoteSelector } from "../selectors/quoteSelector";
import { mdiArrowDown, mdiArrowUp } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch, useSelector } from "react-redux";

export const PriceDisplay = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
  const quote = useSelector(quoteSelector);
  const space = " ";
  return (
    <div>
      {quote && (
        <div>
          <Text variant="primary" size="large" display="inline-block">
            <sup>$</sup>
            {quote.latestPrice.toLocaleString("en")} &nbsp;
          </Text>
          <sup>
            <Icon
              className="arrow"
              path={
                quote.latestPrice - quote.previousClose >= 0
                  ? mdiArrowUp
                  : mdiArrowDown
              }
              size={1.35}
              color={
                quote.latestPrice - quote.previousClose >= 0 ? "green" : "red"
              }
            />
          </sup>
          <Text
            variant={
              quote.latestPrice - quote.previousClose >= 0 ? "gain" : "loss"
            }
            size="large"
            display="inline-block"
          >
            {Math.abs(quote.latestPrice - quote.previousClose).toFixed(2)}
          </Text>
          <Text
            variant={
              quote.latestPrice - quote.previousClose >= 0 ? "gain" : "loss"
            }
            size="large"
            display="inline-block"
            fontWeight="lighter"
            mr="0.5rem"
            ml="0.5rem"
          >
            |
          </Text>
          <Text
            variant={
              quote.latestPrice - quote.previousClose >= 0 ? "gain" : "loss"
            }
            size="large"
            display="inline-block"
          >
            {(
              Math.abs(
                (quote.latestPrice - quote.previousClose) / quote.previousClose
              ) * 100
            ).toFixed(2)}
            <sup>%</sup>
          </Text>
        </div>
      )}
    </div>
  );
};
