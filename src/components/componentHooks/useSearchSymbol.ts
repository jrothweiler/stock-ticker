import { useDispatch } from "react-redux";

export const useSearchSymbol = () => {
  const dispatch = useDispatch();
  return (peer: string) => dispatch({ type: "searchSymbol", payload: peer });
};
