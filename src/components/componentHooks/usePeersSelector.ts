import { peersSelector } from "../../selectors/peersSelector";
import { useSelector } from "react-redux";

export const usePeersSelector = () => {
  return useSelector(peersSelector);
};
