import React from "react";
import { newsSelector } from "../selectors/newsSelector";
import { companySelector} from "../selectors/companySelector";
import { statsSelector } from "../selectors/statsSelector";
import { quoteSelector } from "../selectors/quoteSelector";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import { useDispatch, useSelector } from "react-redux";

export const LatestNews = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
    const newsInfo = useSelector(newsSelector);

    const companyInfo = useSelector(companySelector);
    const quoteInfo = useSelector(quoteSelector)
    const statInfo = useSelector(statsSelector)
    console.log(`company info ${companyInfo}`);
    console.log(`news info ${newsInfo}`)
    console.log(`quote info ${quoteInfo}`)
    console.log(`stat info ${statInfo}`)
  return (
    <DisplayWrapper width="25%" mr="auto" ml="auto">
    <TitleHeader>Latest News</TitleHeader>
    {newsInfo && newsInfo.map((article) => <div className="newsRow"><Text variant="primary">{article.headline}</Text>
        <Text mt="0.3rem" variant="secondary">{article.datetime}  -{article.source}</Text>
        </div>)}
    </DisplayWrapper>
  );
};
