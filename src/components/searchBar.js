import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react'
import {VALID_SEARCH_REGEXP} from '../utils/constants';
import {Text} from '../components/generics/text';
import {searchErrorsSelector} from '../selectors/errorsSelectors';

const SearchBar = () => {
    let [currentText, setCurrentText] = useState('');
    let [showBadInputError, setShowBadInputError] = useState(false);
    let [showCompanyText, setShowCompanyText] = useState(true);
    let searchError = useSelector(searchErrorsSelector);
    let companyName = useSelector((state) => state?.stocks?.tickerInfo?.companyInfo?.companyName) || ''
    let symbol = useSelector((state) => state?.stocks?.ticker) || ''
    let symbolText = symbol ? `(${symbol})` : ''
    let inputRef = useRef(null);
    
    let dispatch = useDispatch();

    function handleType(e) {
        setCurrentText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (currentText.match(VALID_SEARCH_REGEXP)) {
            dispatch({ type: 'searchSymbol', payload: currentText} );
            setCurrentText('');
            setShowBadInputError(false);
        } else {
            setShowBadInputError(true);
        }
    }

    function onInputFocus() {
        setShowCompanyText(false);
    }

    function onLeaveInputFocus() {
        setShowCompanyText(currentText === '');
    }

    function onCompanyTextClick() {
        inputRef.current.focus();
    }

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            <Icon className="searchIcon" path={mdiMagnify} size={1.5} color="#5496ff"/>
            <input ref={inputRef} className="searchBar" onBlur={onLeaveInputFocus} onFocus={onInputFocus} value={currentText} onChange={handleType}/>
            {
                showCompanyText && (
                    <div className="companyText" onClick={onCompanyTextClick}>
                        <Text variant="primary" size="large" display="inline-block" >{companyName}</Text>
                        {' '}
                        <Text variant="secondary" size="large" display="inline-block">{symbolText}</Text>
                    </div>
                )
            }

            {
                showBadInputError && (
                    <Text variant="error">Not a valid input, try again</Text>
                )
            }
            {
                !showBadInputError && searchError && (
                    <Text variant="error">Error in search: {searchError}</Text>
                )
            }
        </form>
    )
};

export default SearchBar; 