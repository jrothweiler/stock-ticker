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
      <DisplayWrapper variant="flexColumn">
        <DisplayWrapper height="50%" variant="flexRow">
          <DisplayWrapper width={["100%", null, "55%"]}>
            <VisualDisplay />
          </DisplayWrapper>
          <DisplayWrapper width={["100%", null, "40%"]}>
            <LatestNews />
          </DisplayWrapper>
          
        </DisplayWrapper>
        <DisplayWrapper height="40%" variant="flexRow">
          <DisplayWrapper width={["100%", null, "55%"]}>
            <KeyStats />
          </DisplayWrapper>
          
          <DisplayWrapper width={["100%", null, "40%"]} variant="flexColumn">
            <CompanyOverview height="65%" />
            <TopPeers height="20%" />
          </DisplayWrapper>
          
        </DisplayWrapper>
      </DisplayWrapper>

    </DisplayWrapper>
  );
};
