export const ApplyFilters = (filter) => ({
  type: "ADD_TO_QUERY",
  payload: filter,
});

export const ResetFilters = () => ({
  type: "RESET_QUERY_FILTERS",
});
