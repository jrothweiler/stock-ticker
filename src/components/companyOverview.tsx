import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { TitleHeader } from "./generics/titleHeader";
import { Text } from "./generics/text";
import { useCompanySelector } from "./componentHooks/useCompanySelector";
import { useTickerSelector } from "./componentHooks/useTickerSelector";
import { StyleProps } from "../types/styleTypes";

// TODO: Fix this nasty hack with specific props
export const CompanyOverview = (props: StyleProps) => {
  const companyInfo = useCompanySelector();
  const ticker = useTickerSelector();

  if (!ticker || !companyInfo) {
    console.error(
      "Something went wrong, CompanyOverview was mounted with no data"
    );
    return null;
  }

  return (
    <DisplayWrapper mb={props.mb}>
      <TitleHeader>COMPANY OVERVIEW</TitleHeader>
      <Text height={props.height} overflow="auto">
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
