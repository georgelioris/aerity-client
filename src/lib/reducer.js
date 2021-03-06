const reducer = (state, action) => {
  const { value } = action;
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: value };
    case 'SET_ERROR':
      return {
        ...state,
        isError: { ...state.isError, ...value }
      };
    case 'SET_LOCATION':
      return { ...state, geoLoc: value };
    case 'SET_WDATA':
      return { ...state, wData: value };

    default:
      return state;
  }
};
export default reducer;
