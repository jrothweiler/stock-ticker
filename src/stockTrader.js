import React from "react";
import { DisplayWrapper } from "./components/generics/displayWrapper";
import { KeyStats } from "./components/keyStats";
import { CompanyOverview } from "./components/companyOverview";
import { LatestNews } from "./components/latestNews";
import { SearchBar } from "./components/searchBar";
import { Header } from "./components/header";
import { VisualDisplay } from "./components/visualDisplay";
import { PriceDisplay } from "./components/priceDisplay";
import { Text } from "./components/generics/text";
import { TitleHeader } from "./components/generics/titleHeader";
import { useDispatch } from "react-redux";

export const StockTrader = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
  return (
    <DisplayWrapper ml="5%" mr="5%" max-width="100%">
      <DisplayWrapper variant="flexRow" justifyContent="flex-end" mb="2.0rem">
        <Header />
      </DisplayWrapper>
      <DisplayWrapper
        mb="3.0rem"
        variant="flexRow"
        paddingBottom="1.0rem"
        borderBottom="0.2rem solid #6491d3"
        width="100%"
      >
        <SearchBar />
        <PriceDisplay />
      </DisplayWrapper>
      <DisplayWrapper variant="flexRow" mb="3.0rem">
        <DisplayWrapper flexBasis="68%">
          <VisualDisplay />
        </DisplayWrapper>
        <DisplayWrapper flexBasis="27%">
          <LatestNews />
        </DisplayWrapper>
      </DisplayWrapper>
      <DisplayWrapper variant="flexRow">
        <DisplayWrapper flexBasis="68%">
          <KeyStats />
        </DisplayWrapper>
        <DisplayWrapper flexBasis="27%">
          <CompanyOverview />
        </DisplayWrapper>
      </DisplayWrapper>
    </DisplayWrapper>
  );
};
