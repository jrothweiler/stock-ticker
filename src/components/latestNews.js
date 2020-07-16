import React from "react";
import { newsSelector } from "../selectors/newsSelector";
import { companySelector} from "../selectors/companySelector";
import { statsSelector } from "../selectors/statsSelector";
import { quoteSelector } from "../selectors/quoteSelector";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import * as timeago from 'timeago.js';
import { useDispatch, useSelector } from "react-redux";

export const LatestNews = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
    const newsInfo = useSelector(newsSelector);

  return (
    <DisplayWrapper width="25%">
      <TitleHeader>Latest News</TitleHeader>

      {newsInfo && newsInfo.map((article) => 
        <div key={article.headline} className="newsRow">
          <Text variant="primary">{article.headline}</Text>
          <Text mt="0.3rem" variant="secondary">{timeago.format(article.datetime)} - {article.source}</Text>
        </div>)
      }
    </DisplayWrapper>
  );
};
