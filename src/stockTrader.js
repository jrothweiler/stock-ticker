import React from "react";
import { DisplayWrapper } from "./components/generics/displayWrapper";
import { KeyStats } from "./components/keyStats";
import { CompanyOverview } from "./components/companyOverview";
import { LatestNews } from "./components/latestNews";
import { SearchBar } from "./components/searchBar";
import { Header } from "./components/header";
import { VisualDisplay } from "./components/visualDisplay";
import { PriceDisplay } from "./components/priceDisplay";
import { TopPeers } from "./components/topPeers";
import { Footer } from "./components/footer";
import { useDispatch, useSelector } from "react-redux";
import { quoteSelector } from "./selectors/quoteSelector";
import { tickerSelector } from "./selectors/tickerSelector";

export const StockTrader = () => {
  //Call necessary selectors for display data
  const quote = useSelector(quoteSelector);
  const dispatch = useDispatch();

  const ticker = useSelector(tickerSelector);

  return (
    <DisplayWrapper ml="5%" mr="5%" mt="2.5%" mb="5%" max-width="100%">
      {ticker && (
        <>
          <DisplayWrapper
            variant="flexRow"
            justifyContent="space-between"
            mb="2.0rem"
          >
            <Header />
          </DisplayWrapper>
          <DisplayWrapper
            mb="3.0rem"
            variant="flexRow"
            justifyContent="space-between"
            paddingBottom="0.7rem"
            borderBottom="0.2rem solid #6491d3"
            width="100%"
          >
            <SearchBar />
            <PriceDisplay data={quote} size="large" />
          </DisplayWrapper>
          <DisplayWrapper variant="flexRow" justifyContent="space-between">
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
          <DisplayWrapper mt="2.0rem" width="100%">
            <Footer width="100%" height="5%" />
          </DisplayWrapper>
        </>
      )}
    </DisplayWrapper>
  );
};
