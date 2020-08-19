import { indexSelector } from "../../selectors/indexSelector";
import { useSelector } from "react-redux";

export const useIndexSelector = () => {
  return useSelector(indexSelector);
};
