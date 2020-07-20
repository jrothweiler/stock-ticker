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
      <DisplayWrapper float="right">
        <Header />
      </DisplayWrapper>
      <DisplayWrapper>
        <TitleHeader variant="grayUnderline">
          <DisplayWrapper display="inline-block">
            <SearchBar />
            </DisplayWrapper>
          <DisplayWrapper display="inline-block" variant="right">
            <PriceDisplay />
            </DisplayWrapper>
        </TitleHeader>
      </DisplayWrapper>
      <DisplayWrapper>
        <DisplayWrapper width="55%" height="40%" display="inline-block">
          <VisualDisplay />
        </DisplayWrapper>
        <DisplayWrapper width="35%" height="40%" variant = "right" display="inline-block">
          <LatestNews />
        </DisplayWrapper>
      </DisplayWrapper>
      <DisplayWrapper width="100%">
        <DisplayWrapper width="55%" height="35%" display="inline-block">
          <KeyStats />
        </DisplayWrapper>
        <DisplayWrapper
          variant="right"
          width="35%"
          height="35%"
          display="inline-block"
        >
          <CompanyOverview />
        </DisplayWrapper>
      </DisplayWrapper>
    </DisplayWrapper>
  );
};
