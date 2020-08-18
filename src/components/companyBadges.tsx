import React from "react";
import { useCompanyBadgeInfo } from "./componentHooks/useCompanyBadgeInfo";
import { DisplayWrapper } from "./generics/displayWrapper";
import { DisplayBadge } from "./generics/displayBadge";
import { StyleProps } from "../types/styleTypes";

export const CompanyBadges = (props: StyleProps) => {
  const badgeInfo = useCompanyBadgeInfo();

  if (badgeInfo.length === 0) {
    console.error(
      "Something went wrong, CompanyBadges was mounted with no data"
    );
    return null;
  }

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
