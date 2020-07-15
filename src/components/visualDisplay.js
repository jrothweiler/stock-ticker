import React from "react";
import { BannerButton } from "./generics/bannerButton";
import { DisplayBadge } from "./generics/displayBadge";
import { DisplayWrapper } from "./generics/displayWrapper";
import { PriceDisplay } from "./generics/priceDisplay";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import { StatLine } from "./generics/statLine";
import { useDispatch, useSelector } from "react-redux";

export const VisualDisplay = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();

  return (
    <DisplayWrapper width="50%" mr="auto" ml="auto">
      <BannerButton selected>Quotes</BannerButton>
      <DisplayBadge>NASDAQ</DisplayBadge>
      <Text variant="primary">$160.03</Text>
      <Text  variant="loss">2.94 | 1.88% </Text>
      <TitleHeader>Latest News</TitleHeader>
      <Text fontSize="1.1rem" fontFamily="Sans-Serif" variant="highlighted">
        Global Consumer Markets Quick to Adopt a Latest Mobile Payment and
        Electronic Wallet...
      </Text>
      <Text fontSize="0.8rem" fontFamily="Sans-Serif" variant="secondary"> 58 min ago -WSJ</Text>
      <Text fontSize="1.1rem" fontFamily="Sans-Serif" variant="primary">
        Amazon's market cap on track to pass Microsoft for first time
      </Text>
      <Text fontSize="0.8rem" fontFamily="Sans-Serif" variant="secondary"> 1hr ago -Morningstar</Text>
      <StatLine> Previous Close 158.73</StatLine>
    </DisplayWrapper>
  );
};
