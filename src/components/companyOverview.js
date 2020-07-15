import React from "react";
import { companySelector} from "../selectors/companySelector";
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
    <DisplayWrapper width="25%" mr="auto" ml="auto">
    <TitleHeader>Company Info</TitleHeader>
    {companyInfo && <Text variant="primary" fontSize="1.8rem">{companyInfo.companyName} ({ticker})</Text>}
    {companyInfo && <Text mt="0.5rem" variant="secondary">{companyInfo.website}</Text>}
    {companyInfo && <Text  mt="0.5rem" variant="primary">{companyInfo.description}</Text>}
    </DisplayWrapper>
  );
};
