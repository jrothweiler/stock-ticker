import React, { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import {
  VALID_SEARCH_REGEXP,
  CLEAR_SEARCH_ERRORS,
  SEARCH_SYMBOL,
} from "../utils/constants";
import { DisplayWrapper } from "./generics/displayWrapper";
import { Text } from "./generics/text";
import { searchErrorsSelector } from "../selectors/errorsSelectors";
import { searchFetch } from "../utils/serverUtils";
import { TableRow } from "./generics/tableRow";
import { TableColumn } from "./generics/tableColumn";
import type { StyleProps } from "../types/styleTypes";
import { tickerSelector } from "../selectors/tickerSelector";
import { companySelector } from "../selectors/companySelector";
import type { SuggestionData, SearchSuggestion } from "../types/reduxTypes";

export const SearchBar = (props: StyleProps) => {
  let [currentText, setCurrentText] = useState("");
  let [symbolSuggestions, setSymbolSuggestions] = useState<SuggestionData>([]);
  let [showBadInputError, setShowBadInputError] = useState(false);
  let [showCompanyText, setShowCompanyText] = useState(true);
  let [isInputFocused, setIsInputFocused] = useState(false);
  let searchError = useSelector(searchErrorsSelector);
  let companyData = useSelector(companySelector);
  let companyName = companyData?.companyName || "";
  let symbol = useSelector(tickerSelector) || "";
  let symbolText = symbol ? `(${symbol})` : "";
  let inputRef = useRef<HTMLInputElement>(null);

  let dispatch = useDispatch();

  function handleSuggestionFetch(value: string) {
    searchFetch(value).then((data) => {
      if (data) {
        // only take up to 5 suggestions
        setSymbolSuggestions(data.slice(0, 5));
      }
    });
  }

  function handleType(e: ChangeEvent<HTMLInputElement>) {
    let newText = e.target.value;
    setCurrentText(newText);
    if (newText !== "") {
      handleSuggestionFetch(newText);
    } else {
      setSymbolSuggestions([]);
    }
  }

  function handleSearch(text: string) {
    if (currentText.match(VALID_SEARCH_REGEXP)) {
      dispatch({ type: SEARCH_SYMBOL, payload: text.toUpperCase() });
      setCurrentText("");
      setShowBadInputError(false);
      dispatch({ type: CLEAR_SEARCH_ERRORS });
      inputRef.current?.blur();
      setSymbolSuggestions([]);
    } else {
      setShowBadInputError(true);
    }
  }

  function onInputFocus() {
    setIsInputFocused(true);
  }

  function onLeaveInputFocus() {
    setIsInputFocused(false);
  }

  function onCompanyTextClick() {
    inputRef.current?.focus();
  }

  function handleRenderSuggestion(item: SearchSuggestion) {
    return (
      <TableRow key={item.symbol} onClick={() => handleSearch(item.symbol)}>
        <TableColumn>
          <Text color="darkblue" size="medium" mr="10px">
            {item.symbol}
          </Text>
        </TableColumn>
        <TableColumn>
          <Text
            variant="primary"
            size="medium"
            mr="16px"
            display="inline-block"
          >
            {item.securityName}
          </Text>
          <Text
            className="suggestionExchange"
            variant="primary"
            display="inline-block"
            padding="2px 8px"
          >
            {item.exchange}
          </Text>
        </TableColumn>
      </TableRow>
    );
  }

  useEffect(() => {
    if (isInputFocused) {
      setShowCompanyText(false);
    } else if (currentText === "") {
      setShowCompanyText(true);
    }
  }, [isInputFocused, currentText]);

  return (
    <DisplayWrapper {...props}>
      <form
        className="searchForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(currentText);
        }}
      >
        <Icon
          className="searchIcon"
          path={mdiMagnify}
          size={1.5}
          color="#5496ff"
        />
        <input
          ref={inputRef}
          className="searchBar"
          onBlur={onLeaveInputFocus}
          onFocus={onInputFocus}
          value={currentText}
          onChange={handleType}
        />
        {symbolSuggestions.length > 0 && (
          <DisplayWrapper
            padding="10px 15px"
            position="absolute"
            className="searchSuggestionsContainer"
          >
            <table>
              <tbody>{symbolSuggestions.map(handleRenderSuggestion)}</tbody>
            </table>
          </DisplayWrapper>
        )}
        {showCompanyText && (
          <div className="companyText" onClick={onCompanyTextClick}>
            <Text
              variant="primary"
              fontWeight="lighter"
              size="large"
              display="inline-block"
            >
              {companyName}
            </Text>{" "}
            <Text
              display={["none", "none", "inline-block"]}
              variant="secondary"
              fontWeight="lighter"
              size="large"
            >
              {symbolText}
            </Text>
          </div>
        )}

        <div>
          {showBadInputError && (
            <Text mt="8px" variant="error">
              Not a valid input, searches should contain only letters
            </Text>
          )}
          {!showBadInputError && searchError && (
            <Text mt="8px" variant="error">
              Error in search: {searchError}
            </Text>
          )}
        </div>
      </form>
    </DisplayWrapper>
  );
};
