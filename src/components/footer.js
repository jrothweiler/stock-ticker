import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { PriceDisplay } from "./priceDisplay";
import { Text } from "./generics/text";
import { useDispatch, useSelector } from "react-redux";

export const Footer = (props) => {

  const dispatch = useDispatch();
  return (
    <DisplayWrapper height={props.height}>
     <div className = "footer" display="inline-block">
     <Text variant="primary" size="small">US MARKET</Text>
     <div display="inline-block"><Text display="inline-block" variant="primary" size="small">NASDAQ</Text><PriceDisplay display="inline-block"/></div>
     <div display="inline-block"><Text display="inline-block" variant="primary" size="small">DJIA </Text><PriceDisplay display="inline-block"/></div>
     <div display="inline-block"><Text display="inline-block" variant="primary" size="small">S&P </Text> <PriceDisplay display="inline-block"/></div> 
     </div>
    </DisplayWrapper>
  );
};