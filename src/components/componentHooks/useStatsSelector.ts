import { statsSelector } from "../../selectors/statsSelector";
import { useSelector } from "react-redux";

export const useStatsSelector = () => {
  return useSelector(statsSelector);
};
