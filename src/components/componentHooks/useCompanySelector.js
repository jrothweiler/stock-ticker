import React from "react";
import { companySelector } from "../../selectors/companySelector";
import { useSelector } from "react-redux";

export const useCompanySelector = () => {
  return useSelector(companySelector);
};
