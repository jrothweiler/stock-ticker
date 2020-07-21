import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { BannerButton } from "./generics/bannerButton";
import { useDispatch } from "react-redux";

export const Header = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();

  return (
    <DisplayWrapper variant="flexRow" mb="2.0rem">
      <DisplayWrapper>
        <img src="./assets/AdaptiveLogo.jpg"></img>
      </DisplayWrapper>
      <DisplayWrapper justifyContent="flex-end">
        <BannerButton variant="selected">QUOTES</BannerButton>
        <BannerButton>MARKETS</BannerButton>
        <BannerButton>WATCHLISTS</BannerButton>
      </DisplayWrapper>
    </DisplayWrapper>
  );
};
