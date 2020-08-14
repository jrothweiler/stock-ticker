import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { PriceDisplay } from "./priceDisplay";
import { Text } from "./generics/text";
import { useIndexSelector } from "./componentHooks/useIndexSelector";

interface Props {
  width?: string;
  height?: string;
}
export const Footer: React.FC<Props> = (Props) => {
  const indexes = useIndexSelector();
  return (
    <DisplayWrapper className="footer" width={width} height={height}>
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
