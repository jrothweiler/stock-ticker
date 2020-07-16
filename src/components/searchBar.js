import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react'

const SearchBar = () => {
    let [currentText, setCurrentText] = useState('');
    let dispatch = useDispatch();

    function handleType(e) {
        setCurrentText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch({ type: 'searchSymbol', payload: currentText} );
        setCurrentText('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <Icon className="searchIcon" path={mdiMagnify} size={1} color="#5496ff"/>
            <input className="searchBar" value={currentText} onChange={handleType}/>
        </form>
        
    )
};

export default SearchBar; 