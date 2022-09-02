export const ApplyFilters = (filter) => ({
  type: "ADD_FILTER_QUERY",
  payload: filter,
});

export const ResetFilters = () => ({
  type: "RESET_QUERY_FILTERS",
});

export const ApplySearch = (query) => ({
  type: "ADD_SEARCH_QUERY",
  payload: query,
});

export const ResetSearch = () => ({
  type: "RESET_SEARCH",
});

export const ApplySort = (sort) => ({
  type: "ADD_SORT_QUERY",
  payload: sort,
});
export const ResetSort = () => ({
  type: "RESET_SORT",
});
