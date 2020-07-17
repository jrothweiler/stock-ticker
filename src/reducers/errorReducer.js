const initialState = {
    search: null
}

export default (state = initialState, action) => {
    
    switch (action.type) {
        case 'searchError':
            return {
                ...state,
                search: action.payload
            }
        case 'clearSearchErrors': 
            return {
                ...state, 
                search: null
            }
        default: 
            return state;
    }
}