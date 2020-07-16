import React from "react";
import { newsSelector } from "../selectors/newsSelector";
import { companySelector} from "../selectors/companySelector";
import { statsSelector } from "../selectors/statsSelector";
import { quoteSelector } from "../selectors/quoteSelector";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import en from 'timeago.js/lib/lang/vi';
import { useDispatch, useSelector } from "react-redux";

timeago.register('en', en);

export const TopPeers = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
    const newsInfo = useSelector(newsSelector);

    const companyInfo = useSelector(companySelector);
    const quoteInfo = useSelector(quoteSelector)
    const statInfo = useSelector(statsSelector)
  return (
    <DisplayWrapper width="25%" mr="auto" ml="auto">
    <TitleHeader>Top Peers</TitleHeader>
    </DisplayWrapper>
  );
};
