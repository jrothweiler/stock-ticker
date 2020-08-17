import React from "react";
import { useCompanyBadgeInfo } from "./componentHooks/useCompanyBadgeInfo";
import { DisplayWrapper } from "./generics/displayWrapper";
import { DisplayBadge } from "./generics/displayBadge";
import { StyledSystem } from "../types";
export const CompanyBadges = (props: StyledSystem) => {
  const badgeInfo = useCompanyBadgeInfo();

  return (
    <DisplayWrapper {...props} variant="flexRow" justifyContent="flex-start">
      {badgeInfo.map((badgeText, indx) => (
        <DisplayBadge key={indx} mb="8px" mr="12px">
          {badgeText}
        </DisplayBadge>
      ))}
    </DisplayWrapper>
  );
};
