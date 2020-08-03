import { useSelector } from "react-redux";
import { companyBadgeInfoSelector } from "../../selectors/companySelector";

export const useCompanyBadgeInfo = () => useSelector(companyBadgeInfoSelector);
