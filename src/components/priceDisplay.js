import React from "react";
import { Text } from "./generics/text";
import { quoteSelector } from "../selectors/quoteSelector";
import { mdiArrowDown, mdiArrowUp } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch, useSelector } from "react-redux";


export const PriceDisplay = (props) => {
  //Call necessary selectors for display data
  const quote = useSelector(quoteSelector);
  return (
    <div display={props.display}>
      {quote && (
        <div>
          <Text variant="primary" fontWeight="lighter" size={props.size} display="inline-block">
            <sup>
              <div className="dollarSign">$</div>
            </sup>
            {quote.latestPrice.toLocaleString("en")} &nbsp;
          </Text>
          <sup>
            <Icon
              className="arrow"
              path={
                quote.latestPrice - quote.open >= 0
                  ? mdiArrowUp
                  : mdiArrowDown
              }
              size={1.1}
              color={
                quote.latestPrice - quote.open >= 0 ? "#91e4a5" : "#E95656"
              }
            />
          </sup>
          <Text
            variant={
              quote.latestPrice - quote.open >= 0 ? "gain" : "loss"
            }
            fontWeight="lighter"
            size={props.size}
            display="inline-block"
          >
            {Math.abs(quote.latestPrice - quote.open).toFixed(2)}
          </Text>
          <Text
            variant={
              quote.latestPrice - quote.open >= 0 ? "gain" : "loss"
            }
            size={props.size}
            display="inline-block"
            fontWeight="lighter"
            mr="0.5rem"
            ml="0.5rem"
            className="separator"
          >
            |
          </Text>
          <Text
            variant={
              quote.latestPrice - quote.open >= 0 ? "gain" : "loss"
            }
            size={props.size}
            display="inline-block"
            fontWeight="lighter"
          >
            {(
              Math.abs(
                (quote.latestPrice - quote.open) / quote.open
              ) * 100
            ).toFixed(2)}
            <sup>
              <div className="percentSign">%</div>
            </sup>
          </Text>
        </div>
      )}
    </div>
  );
};
