const QueryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FILTER_QUERY":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_QUERY_FILTERS":
      if (state.search) return { search: state.search };
      return {};
    case "ADD_SEARCH_QUERY":
      return {
        ...state,
        query: action.payload,
      };
    case "RESET_SEARCH":
      const { query, ...rest } = state;
      return rest;
    case "ADD_SORT_QUERY":
      return {
        ...state,
        sort: action.payload,
      };
    case "RESET_SORT":
      const { sort, ...other } = state;
      return other;
    default:
      return state;
  }
};

export default QueryReducer;
