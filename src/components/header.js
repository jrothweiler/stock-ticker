import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { BannerButton } from "./generics/bannerButton";
import { useDispatch } from "react-redux";

export const Header = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();

  return (
    <DisplayWrapper width="100%" float="right" mb="2.0rem">
      <BannerButton variant="selected">QUOTES</BannerButton>
      <BannerButton>MARKETS</BannerButton>
      <BannerButton>WATCHLISTS</BannerButton>
    </DisplayWrapper>
  );
};
