import React from "react";
import { DisplayWrapper } from "./components/generics/displayWrapper";
import { KeyStats } from "./components/keyStats";
import { CompanyOverview } from "./components/companyOverview";
import { LatestNews } from "./components/latestNews";
import { SearchBar } from "./components/searchBar";
import { Header } from "./components/header";
import { VisualDisplay } from "./components/visualDisplay";
import { PriceDisplay } from "./components/priceDisplay";
import { selectLayout } from "./selectors/layoutSelectors";
import { useSelector } from "react-redux";

export const StockTrader = () => {
  const layout = useSelector(selectLayout);

  console.log(layout);

  const bodyLayout = layout === "desktop" ? (
    <DisplayWrapper variant="flexRow">
      <DisplayWrapper width="65%" variant="flexColumn">
        <VisualDisplay height="55%" />
        <KeyStats height="35%" />
      </DisplayWrapper>
      <DisplayWrapper width="27.5%" variant="flexColumn">
        <LatestNews height="50%" />
        <CompanyOverview height="35%" />
      </DisplayWrapper>
    </DisplayWrapper>
  ) : (
    <DisplayWrapper variant="flexColumn" width="100%">
        <VisualDisplay height="40%" />
        <KeyStats height="25%" />
        <LatestNews height="20%" />
        <CompanyOverview height="15%" />
    </DisplayWrapper>
  );

  return (
    <DisplayWrapper ml="5%" mr="5%" mt="2.5%" mb="5%" max-width="100%">
      <DisplayWrapper variant="flexRow" mb="2.0rem">
        <Header />
      </DisplayWrapper>
      <DisplayWrapper
        mb="3.0rem"
        variant="flexRow"
        paddingBottom="0.7rem"
        borderBottom="0.2rem solid #6491d3"
        width="100%"
      >
        <SearchBar />
        <PriceDisplay />
      </DisplayWrapper>
      {bodyLayout}
    </DisplayWrapper>
  );
};
