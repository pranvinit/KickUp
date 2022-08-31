import { useReducer, createContext } from "react";
import axios from "axios";

// action creators import
import {
  AuthorizeUser,
  AuthStart,
  AuthSuccess,
  AuthError,
  Logout,
} from "./AuthActions";

// reducer function import
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

// auth services imports

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const authorizeUser = async () => {
    try {
      const user = await axios.get("/api/users/showMe");
      dispatch(AuthorizeUser(user.data.user));
    } catch (err) {
      console.log(err);
    }
  };

  const loginRequest = async ({ email, password }) => {
    dispatch(AuthStart());
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      dispatch(AuthSuccess(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      dispatch(AuthError(err.response.data));
    }
  };

  const registerRequest = async (body) => {
    dispatch(AuthStart());
    try {
      const res = await axios.post("/api/auth/register", body);
      dispatch(AuthSuccess(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      dispatch(AuthError(err.response.data));
    }
  };

  const logoutRequest = async () => {
    await axios.get("/api/auth/logout");
    localStorage.removeItem("user");
    dispatch(Logout());
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        authorizeUser,
        loginRequest,
        registerRequest,
        logoutRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
