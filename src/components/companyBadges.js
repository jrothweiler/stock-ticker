import React from "react";
import { useCompanyBadgeInfo } from "./componentHooks/useCompanyBadgeInfo";
import { DisplayWrapper } from "./generics/displayWrapper";
import { DisplayBadge } from "./generics/displayBadge";

export const CompanyBadges = (props) => {
  const badgeInfo = useCompanyBadgeInfo();

  return (
    <DisplayWrapper {...props} variant="flexRow" justifyContent="flex-start">
      {badgeInfo.map((badgeText, indx) => (
        <DisplayBadge key={indx} mb="8px" mr="16px">
          {badgeText}
        </DisplayBadge>
      ))}
    </DisplayWrapper>
  );
};
