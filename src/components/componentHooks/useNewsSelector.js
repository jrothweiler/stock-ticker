import React from "react";
import { newsSelector } from "../../selectors/newsSelector";
import { useSelector } from "react-redux";

export const useNewsSelector = () => {
  return useSelector(newsSelector);
};
