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
    <DisplayWrapper>
      <DisplayWrapper ml="5%" float="right">
        <Header />
      </DisplayWrapper>
      <DisplayWrapper ml="5%">
        <TitleHeader variant="grayUnderline" mb="2.0rem">
          <Text display="inline-block">
            <SearchBar />
          </Text>
          <Text display="inline-block" float="right" text-align="right">
            <PriceDisplay />
          </Text>
        </TitleHeader>
      </DisplayWrapper>
      <DisplayWrapper width="100%">
        <DisplayWrapper width="50%" height="40%" ml="5%" display="inline-block">
          <VisualDisplay />
        </DisplayWrapper>
        <DisplayWrapper width="30%" height="40%" ml="5%" display="inline-block">
          <LatestNews />
        </DisplayWrapper>
      </DisplayWrapper>
      <DisplayWrapper width="100%">
        <DisplayWrapper width="50%" height="35%" ml="5%" display="inline-block">
          <KeyStats />
        </DisplayWrapper>
        <DisplayWrapper
          float="right"
          width="30%"
          height="35%"
          ml="5%"
          display="inline-block"
        >
          <CompanyOverview />
        </DisplayWrapper>
      </DisplayWrapper>
    </DisplayWrapper>
  );
};
