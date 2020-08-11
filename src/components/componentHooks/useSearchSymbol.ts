import { useDispatch } from "react-redux";

export const useSearchSymbol = () => {
  const dispatch = useDispatch();
  return (peer: string): void => {
    dispatch({ type: "searchSymbol", payload: peer });
  };
};
