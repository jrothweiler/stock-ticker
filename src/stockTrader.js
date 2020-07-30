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
          <DisplayWrapper variant="flexRow" mb="2.0rem">
            <Header />
          </DisplayWrapper>
          <DisplayWrapper
            mb="3.0rem"
            variant={["flexColumn", "flexRow", "flexRow"]}
            paddingBottom="0.7rem"
            borderBottom="0.2rem solid #6491d3"
            width="100%"
          >
            <SearchBar
              width={["100%", "30%", "50%"]}
              mb={["8px", "0px", "0px"]}
            />
            <PriceDisplay
              data={quote}
              size={["mediumLarge", "large", "large"]}
            />
          </DisplayWrapper>
          <DisplayWrapper variant="flexColumn">
            <DisplayWrapper height="50%" variant="flexRow">
              <VisualDisplay width={["100%", null, "55%"]} mb="32px" />
              <LatestNews width={["100%", null, "40%"]} mb="32px" />
            </DisplayWrapper>
            <DisplayWrapper height="40%" variant="flexRow">
              <KeyStats width={["100%", null, "55%"]} mb="32px" />

              <DisplayWrapper
                width={["100%", null, "40%"]}
                variant="flexColumn"
              >
                <CompanyOverview mb="32px" />
                <TopPeers />
              </DisplayWrapper>
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
