import React from "react";
import { companySelector } from "../selectors/companySelector";
import { tickerSelector } from "../selectors/tickerSelector";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import { useDispatch, useSelector } from "react-redux";

export const CompanyOverview = (props) => {
  //Call necessary selectors for display data
  const dispatch = useDispatch();
  const companyInfo = useSelector(companySelector);
  const ticker = useSelector(tickerSelector);
  return (
    <DisplayWrapper height={props.height}>
      <TitleHeader>COMPANY OVERVIEW</TitleHeader>
      <Text height="100%" overflow="auto">
        {companyInfo && (
          <Text variant="primary" fontSize="1.8rem">
            {companyInfo.companyName} ({ticker})
          </Text>
        )}
        {companyInfo && (
          <a href={`${companyInfo.website}`} target="_blank">
            <Text className="companyLink" mt="0.5rem" variant="secondary" fontStyle="italic">
              {companyInfo.website}
            </Text>
          </a>
        )}
        {companyInfo && (
          <Text mt="0.5rem" variant="primary">
            {companyInfo.description}
          </Text>
        )}
      </Text>
    </DisplayWrapper>
  );
};
