import { useDispatch } from "react-redux";

export const searchSymbol = (peer) => {
  const dispatch = useDispatch();
  dispatch({ type: "searchSymbol", payload: peer });
};
