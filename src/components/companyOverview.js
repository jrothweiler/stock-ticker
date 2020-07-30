import React from "react";
import { companySelector } from "../selectors/companySelector";
import { tickerSelector } from "../selectors/tickerSelector";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import { useDispatch, useSelector } from "react-redux";
import { useCompanySelector } from "./componentHooks/useCompanySelector";
import { useTickerSelector } from "./componentHooks/useTickerSelector";
export const CompanyOverview = (props) => {
  //Call necessary selectors for display data
  const companyInfo = useCompanySelector();
  const ticker = useTickerSelector();
  return (
    <DisplayWrapper {...props}>
      <TitleHeader>COMPANY OVERVIEW</TitleHeader>
      <Text height="100%" overflow="auto">
        <Text variant="primary" fontSize="1.8rem">
          {companyInfo.companyName} ({ticker})
        </Text>
        <a href={`${companyInfo.website}`} target="_blank">
          <Text
            className="companyLink"
            mt="0.5rem"
            variant="secondary"
            fontStyle="italic"
          >
            {companyInfo.website}
          </Text>
        </a>
        <Text mt="0.5rem" variant="primary">
          {companyInfo.description}
        </Text>
      </Text>
    </DisplayWrapper>
  );
};
