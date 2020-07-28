import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { PriceDisplay } from "./priceDisplay";
import { Text } from "./generics/text";
import { indexSelector } from "../selectors/indexSelector";
import { useDispatch, useSelector } from "react-redux";

export const Footer = (props) => {

  const dispatch = useDispatch();
  const indexes = [useSelector(indexSelector)];
  return (
    <DisplayWrapper height={props.height}>
     <DisplayWrapper className = "footer" variant="flexRow">
     <Text variant="primary" size="small">US MARKET</Text>
     {indexes && indexes.map((index) => (<PriceDisplay data={index} size="medium" />))}
        <div mr="1.0rem"><Text variant="primary" size="small" mr="0.5rem">NASDAQ</Text><PriceDisplay /></div>
        <div><Text display="inline-block" variant="primary" size="small">DJIA</Text><PriceDisplay display="inline-block"/></div>
        <div><Text display="inline-block" variant="primary" size="small">S&P</Text> <PriceDisplay display="inline-block"/></div> 
     </DisplayWrapper>
    </DisplayWrapper>
  );
};