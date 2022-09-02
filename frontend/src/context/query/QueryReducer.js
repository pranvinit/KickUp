const QueryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_QUERY":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_QUERY_FILTERS":
      if (state.search) return { search: state.search };
      return {};
    default:
      return state;
  }
};

export default QueryReducer;
