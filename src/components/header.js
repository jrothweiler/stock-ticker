import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import logo from "./assets/AdaptiveLogo.png";
import { BannerButton } from "./generics/bannerButton";
import { useDispatch } from "react-redux";

export const Header = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();

  return (
    <DisplayWrapper
      justifyContent="space-between"
      width="100%"
      variant="flexRow"
    >
      <DisplayWrapper>
        <img src={logo} height="65%"></img>
      </DisplayWrapper>
      <DisplayWrapper>
        <BannerButton variant="selected">QUOTES</BannerButton>
        <BannerButton>MARKETS</BannerButton>
        <BannerButton>WATCHLISTS</BannerButton>
      </DisplayWrapper>
    </DisplayWrapper>
  );
};
