import React from "react";
import { quoteSelector } from "../../selectors/quoteSelector";
import { useDispatch, createDispatchHook } from "react-redux";


export const useSearchSymbol = (peer) => { 
    const dispatch = useDispatch();
    return (() =>
    dispatch({ type: "searchSymbol", payload: peer })
)};
