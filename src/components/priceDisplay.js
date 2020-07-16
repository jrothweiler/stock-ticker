import React from 'react';
import { Text } from "./generics/text";
import { quoteSelector } from "../selectors/quoteSelector";
import { useDispatch, useSelector } from "react-redux";

export const PriceDisplay = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
  const quote = useSelector(quoteSelector);

  return (
    <div>
      {quote && 
        <div>
          <Text variant="primary" size="large" display="inline-block">${quote.latestPrice.toLocaleString('en')}  &nbsp;</Text>
          <Text variant="gain" size="large" display="inline-block">{(Math.abs(quote.latestPrice - quote.previousClose).toFixed(2))}  &nbsp; </Text>
          <Text variant="gain" size="large" display="inline-block">{(Math.abs((quote.latestPrice - quote.previousClose)/(quote.previousClose)) * 100).toFixed(2)}%</Text>
        </div>}
    </div>
  );
};