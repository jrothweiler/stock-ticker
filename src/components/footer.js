import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { PriceDisplay } from "./priceDisplay";
import { Text } from "./generics/text";
import { indexSelector } from "../selectors/indexSelector";
import { useDispatch, useSelector } from "react-redux";

export const Footer = (props) => {
  const dispatch = useDispatch();
  const indexes = useSelector(indexSelector);
  return (
    <DisplayWrapper height={props.height}>
      <DisplayWrapper className="footer" variant="flexRow">
        <Text variant="primary" size="small">
          US MARKET
        </Text>
        {indexes &&
          indexes.map((index) => <PriceDisplay data={index} size="medium" />)}
      </DisplayWrapper>
    </DisplayWrapper>
  );
};
