import React from "react";
import { newsSelector } from "../selectors/newsSelector";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import * as timeago from "timeago.js";
import { useDispatch, useSelector } from "react-redux";

export const LatestNews = (props) => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
  const newsInfo = useSelector(newsSelector);

  return (
    <DisplayWrapper height={props.height}>
      <TitleHeader variant="blueUnderline">LATEST NEWS</TitleHeader>
      <DisplayWrapper overflow="auto" height="100%">
        {newsInfo &&
          newsInfo.map((article) => (
            <div key={article.headline}>
              <a href={`${article.url}`} target="_blank">
                <Text className="headline" variant="primary">
                  {article.headline}
                </Text>
              </a>
              <Text mt="0.3rem" variant="secondary" mb="1.0rem">
                {timeago.format(article.datetime)} - {article.source}
              </Text>
            </div>
          ))}
      </DisplayWrapper>
    </DisplayWrapper>
  );
};
