import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react'
import {VALID_SEARCH_REGEXP} from '../utils/constants';
import {Text} from '../components/generics/text';
import {searchErrorsSelector} from '../selectors/errorsSelectors';

const SearchBar = () => {
    let [currentText, setCurrentText] = useState('');
    let [showBadInputError, setShowBadInputError] = useState(false);
    let searchError = useSelector(searchErrorsSelector);
    
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

    return (
        <form onSubmit={handleSubmit}>
            <Icon className="searchIcon" path={mdiMagnify} size={1} color="#5496ff"/>
            <input className="searchBar" value={currentText} onChange={handleType}/>
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