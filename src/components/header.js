import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import logo from "./assets/AdaptiveLogo.png";
import { BannerButton } from "./generics/bannerButton";
import { useDispatch } from "react-redux";

export const Header = () => {

  return (
    <DisplayWrapper width="100%" variant="flexRow">
      <DisplayWrapper height="50px" width="155px">
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
