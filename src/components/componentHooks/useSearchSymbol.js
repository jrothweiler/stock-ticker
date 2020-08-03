import { useDispatch, useSelector } from "react-redux";
import { usePeersSelector } from "./componentHooks/usePeersSelector";

export const useSearchSymbol = (peer) => {
  const dispatch = useDispatch();
  dispatch({ type: "searchSymbol", payload: peer });
};
