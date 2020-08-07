import { quoteSelector } from "../../selectors/quoteSelector";
import { useSelector } from "react-redux";

export const useQuoteSelector = () => {
  return useSelector(quoteSelector);
};
