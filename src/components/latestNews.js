import React from "react";
import { newsSelector} from "../selectors/newsSelector"
import { BannerButton } from "./generics/bannerButton";
import { DisplayBadge } from "./generics/displayBadge";
import { DisplayWrapper } from "./generics/displayWrapper";
import { PriceDisplay } from "./generics/priceDisplay";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import { StatLine } from "./generics/statLine";

import { useDispatch, useSelector } from "react-redux";

export const LatestNews = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
    const newsArticles = useSelector(newsSelector);
  return (
    <DisplayWrapper width="25%" mr="auto" ml="auto">
    {newsArticles.map((article) => <div><Text variant="primary">article.headline</Text>
        <Text variant="secondary">article.datetime</Text>
        <Text variant="secondary">article.source</Text></div>)}
    </DisplayWrapper>
  );
};
