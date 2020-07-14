import React from "react";
import { BannerButton } from "./generics/bannerButton";
import { DisplayBadge } from "./generics/displayBadge";
import { DisplayWrapper } from "./generics/displayWrapper";
import { PriceDisplay } from "./generics/priceDisplay";
import { TitleHeader } from "./generics/titleHeader";
import { HeadlineText } from "./generics/headlineText";
import { SubHeadlineText } from "./generics/subHeadlineText";
import { StatLine } from "./generics/statLine";
import { useDispatch, useSelector } from "react-redux";

export const VisualDisplay = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();

  return (
    <DisplayWrapper>
      <BannerButton selected>Quotes</BannerButton>
      <DisplayBadge>NASDAQ</DisplayBadge>
      <PriceDisplay>$160.03</PriceDisplay>
      <PriceDisplay loss>2.94 | 1.88% </PriceDisplay>
      <TitleHeader>Latest News</TitleHeader>
      <HeadlineText highlight>
        Global Consumer Markets Quick to Adopt a Latest Mobile Payment and
        Electronic Wallet...
      </HeadlineText>
      <SubHeadlineText> 58 min ago -WSJ</SubHeadlineText>
      <HeadlineText>
        Amazon's market cap on track to pass Microsoft for first time
      </HeadlineText>
      <SubHeadlineText> 1hr ago -Morningstar</SubHeadlineText>
      <StatLine> Previous Close 158.73</StatLine>
    </DisplayWrapper>
  );
};
