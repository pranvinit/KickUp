const AuthReducer = (state, action) => {
  switch (action.type) {
    case "AUTHORIZE_USER":
      return {
        user: action.payload,
        isFetching: false,
        error: null,
      };
    case "AUTH_START":
      return {
        user: null,
        isFetching: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
