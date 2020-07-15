import React from "react";
import { newsSelector} from "../selectors/newsSelector"
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import { useDispatch, useSelector } from "react-redux";

export const LatestNews = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
    const newsArticles = useSelector(newsSelector);
  return (
    <DisplayWrapper width="25%" mr="auto" ml="auto">
    <TitleHeader>Latest News</TitleHeader>
    {newsArticles && newsArticles.map((article) => <div className="newsRow"><Text variant="primary">{article.headline}</Text>
        <Text mt="0.3rem" variant="secondary">{article.datetime}  -{article.source}</Text>
        </div>)}
    </DisplayWrapper>
  );
};
