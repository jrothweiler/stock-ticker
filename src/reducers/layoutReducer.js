const initialState = {
  isDesktopSize: true,
  isTabletSize: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'windowSizeChange': {
        return {
            ...state,
            ...action.payload
        }
    }
    default:
      return state;
  }
};
