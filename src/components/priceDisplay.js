import React from "react";
import { Text } from "./generics/text";
import { mdiArrowDown, mdiArrowUp } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch, useSelector } from "react-redux";

export const PriceDisplay = (props) => {
  return (
    <div>
      {props.data && (
        <div>
          <Text
            variant="primary"
            fontWeight="bold"
            size={props.size}
            display="inline-block"
            mr={props.size === "medium" ? "0.5rem" : "0.0rem"}
          >
            {props.ticker}
          </Text>
          <Text
            variant="primary"
            fontWeight="lighter"
            size={props.size}
            display="inline-block"
          >
            <sup>
              <div className="dollarSign">$</div>
            </sup>
            {props.data.latestPrice.toLocaleString("en")} &nbsp;
          </Text>
          <sup>
            <Icon
              className="arrow"
              path={
                props.data.latestPrice - props.data.open >= 0
                  ? mdiArrowUp
                  : mdiArrowDown
              }
              size={props.size === "medium" ? 0.58 : 1.35}
              color={
                props.data.latestPrice - props.data.open >= 0
                  ? "#91e4a5"
                  : "#E95656"
              }
            />
          </sup>
          <Text
            variant={
              props.data.latestPrice - props.data.open >= 0 ? "gain" : "loss"
            }
            fontWeight="lighter"
            size={props.size}
            display="inline-block"
          >
            {Math.abs(props.data.latestPrice - props.data.open).toFixed(2)}
          </Text>
          <Text
            variant={
              props.data.latestPrice - props.data.open >= 0 ? "gain" : "loss"
            }
            size={props.size}
            display="inline-block"
            fontWeight="lighter"
            mr={props.size === "medium" ? "0.15rem" : "0.5rem"}
            ml={props.size === "medium" ? "0.15rem" : "0.5rem"}
            className="separator"
          >
            |
          </Text>
          <Text
            variant={
              props.data.latestPrice - props.data.open >= 0 ? "gain" : "loss"
            }
            size={props.size}
            display="inline-block"
            fontWeight="lighter"
          >
            {(
              Math.abs(
                (props.data.latestPrice - props.data.open) / props.data.open
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
