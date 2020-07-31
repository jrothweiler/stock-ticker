import React from "react";
import { companyBadgeInfoSelector } from "../selectors/companySelector";
import { DisplayWrapper } from "./generics/displayWrapper";
import { DisplayBadge } from "./generics/displayBadge";
import { useDispatch, useSelector } from "react-redux";

export const CompanyBadges = (props) => {
  const badgeInfo = useSelector(companyBadgeInfoSelector);

  return (
    <DisplayWrapper {...props} variant="flexRow" justifyContent="flex-start">
      {badgeInfo.map((badgeText) => (
        <DisplayBadge mb="8px" mr="16px">
          {badgeText}
        </DisplayBadge>
      ))}
    </DisplayWrapper>
  );
};
