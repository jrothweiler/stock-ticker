import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import logo from "./assets/AdaptiveLogo.png";
import { BannerButton } from "./generics/bannerButton";

export const Header = () => {
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
