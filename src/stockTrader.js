import React from "react";
import { DisplayWrapper } from "./components/generics/displayWrapper";
import { KeyStats } from "./components/keyStats";
import { CompanyOverview } from "./components/companyOverview";
import { LatestNews } from "./components/latestNews";
import { SearchBar } from "./components/searchBar";
import { Header } from "./components/header";
import { VisualDisplay } from "./components/visualDisplay";
import { PriceDisplay } from "./components/priceDisplay";
import { TopPeers} from "./components/topPeers";
import { Footer } from "./components/footer"
import { useDispatch } from "react-redux";

export const StockTrader = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
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
      <DisplayWrapper variant="flexRow">
        <DisplayWrapper width="70%" variant="flexColumn">
          <VisualDisplay height="55%" />
          <KeyStats height="35%" />
        </DisplayWrapper>
        <DisplayWrapper width="25%" variant="flexColumn">
          <LatestNews height="40%" />
          <CompanyOverview height="30%" />
          <TopPeers height="15%" />
        </DisplayWrapper>
      </DisplayWrapper>

    </DisplayWrapper>
  );
};
