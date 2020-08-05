import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { VALID_SEARCH_REGEXP } from "../utils/constants";
import { DisplayWrapper } from "../components/generics/displayWrapper";
import { Text } from "../components/generics/text";
import { searchErrorsSelector } from "../selectors/errorsSelectors";
import Autosuggest from "react-autosuggest";
import { searchFetch } from "../utils/serverUtils";
import { DisplayBadge } from "../components/generics/displayBadge";

export const SearchBar = (props) => {
  let [currentText, setCurrentText] = useState("");
  let [symbolSuggestions, setSymbolSuggestions] = useState([]);
  let [showBadInputError, setShowBadInputError] = useState(false);
  let [showCompanyText, setShowCompanyText] = useState(true);
  let [isInputFocused, setIsInputFocused] = useState(false);
  let searchError = useSelector(searchErrorsSelector);
  let companyName =
    useSelector(
      (state) => state?.stocks?.tickerInfo?.companyInfo?.companyName
    ) || "";
  let symbol = useSelector((state) => state?.stocks?.ticker) || "";
  let symbolText = symbol ? `(${symbol})` : "";
  let inputRef = useRef(null);

  let dispatch = useDispatch();

  function handleType(e, { newValue }) {
    setCurrentText(newValue);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (currentText.match(VALID_SEARCH_REGEXP)) {
      dispatch({ type: "searchSymbol", payload: currentText.toUpperCase() });
      setCurrentText("");
      setShowBadInputError(false);
      dispatch({ type: "clearSearchErrors" });
      inputRef.current.blur();
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
    inputRef.current.focus();
  }

  function handleSuggestionFetch({ value }) {
    searchFetch(value).then((data) => {
      if (data) {
        setSymbolSuggestions(data);
      }
    });
  }

  function handleSuggestionClear() {
    setSymbolSuggestions([]);
  }

  function getSuggestionValue(item) {
    return item.symbol;
  }

  function handleRenderSuggestion(item) {
    return (
      <tr>
        <td>
          <Text color="darkblue" size="medium" mr="10px">
            {item.symbol}
          </Text>
        </td>
        <td>
          <Text
            variant="primary"
            size="medium"
            mr="16px"
            display="inline-block"
          >
            {item.securityName}
          </Text>
          <Text variant="primary" display="inline-block">
            {item.exchange}
          </Text>
        </td>
      </tr>
    );
  }

  // Bad approach, mapping handleRenderSuggestion
  // instead of using the children argument that already has
  // handleRenderSuggestion applied, but this library
  // always makes the children a ul list, so we cannot
  // do a table with this library without this workaround.
  function handleRenderSuggestionContainer({ containerProps }) {
    return (
      <table {...containerProps}>
        {symbolSuggestions.map(handleRenderSuggestion)}
      </table>
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
      <form className="searchForm" onSubmit={handleSubmit}>
        <Icon
          className="searchIcon"
          path={mdiMagnify}
          size={1.5}
          color="#5496ff"
        />
        <Autosuggest
          suggestions={symbolSuggestions}
          onSuggestionsFetchRequested={handleSuggestionFetch}
          onSuggestionsClearRequested={handleSuggestionClear}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={handleRenderSuggestion}
          renderSuggestionsContainer={handleRenderSuggestionContainer}
          inputProps={{
            value: currentText,
            onChange: handleType,
            onFocus: onInputFocus,
            onBlur: onLeaveInputFocus,
            ref: inputRef,
          }}
          theme={{
            input: "searchBar",
            container: "searchContainer",
            suggestionsContainer: "searchSuggestionsContainer",
            suggestionsList: "searchSuggestionsList",
          }}
        />
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
