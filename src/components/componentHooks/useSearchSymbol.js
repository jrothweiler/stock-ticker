import React from "react";
import { quoteSelector } from "../../selectors/quoteSelector";
import { useDispatch, createDispatchHook } from "react-redux";


export const useSearchSymbol = () => { 
    const dispatch = useDispatch();
    return ((peer) =>
    dispatch({ type: "searchSymbol", payload: peer })
)};
