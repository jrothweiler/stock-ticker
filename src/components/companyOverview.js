import React from "react";
import { companySelector } from "../selectors/companySelector";
import { tickerSelector } from "../selectors/tickerSelector";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import { useDispatch, useSelector } from "react-redux";

export const CompanyOverview = () => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
  const companyInfo = useSelector(companySelector);
  const ticker = useSelector(tickerSelector);
  return (
    <DisplayWrapper width="25%" height="25%">
      <TitleHeader>Company Info</TitleHeader>
      {companyInfo && (
        <Text variant="primary" fontSize="1.8rem">
          {companyInfo.companyName} ({ticker})
        </Text>
      )}
      {companyInfo && (
        <a href={`http://${companyInfo.website}`} target="_blank">
          <Text mt="0.5rem" variant="secondary" fontStyle="italic">
            {companyInfo.website}
          </Text>
        </a>
      )}
      {companyInfo && (
        <Text mt="0.5rem" variant="primary" overflow="auto" height="15.0rem">
          {companyInfo.description}
        </Text>
      )}
    </DisplayWrapper>
  );
};
