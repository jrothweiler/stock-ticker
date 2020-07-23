import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { VALID_SEARCH_REGEXP } from "../utils/constants";
import { DisplayWrapper } from '../components/generics/displayWrapper';
import { Text } from "../components/generics/text";
import { searchErrorsSelector } from "../selectors/errorsSelectors";

export const SearchBar = () => {
  let [currentText, setCurrentText] = useState("");
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

  function handleType(e) {
    setCurrentText(e.target.value);
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

  useEffect(() => {
    if (isInputFocused) {
      setShowCompanyText(false);
    } else if (currentText === '') {
      setShowCompanyText(true);
    }
  }, [isInputFocused, currentText])

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
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
      {showCompanyText && (
        <div className="companyText" onClick={onCompanyTextClick}>
          <Text variant="primary" fontWeight="lighter" size="large" display="inline-block">
            {companyName}
          </Text>{" "}
          <Text variant="secondary" fontWeight="lighter" size="large" display="inline-block">
            {symbolText}
          </Text>
        </div>
      )}

      <div>
        {showBadInputError && (
          <Text mt="8px" variant="error">Not a valid input, searches should contain only letters</Text>
        )}
        {!showBadInputError && searchError && (
          <Text mt="8px" variant="error">Error in search: {searchError}</Text>
        )}
      </div>

      
    </form>
  );
};
