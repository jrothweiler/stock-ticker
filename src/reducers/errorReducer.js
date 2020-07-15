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
        default: 
            return state;
    }
}