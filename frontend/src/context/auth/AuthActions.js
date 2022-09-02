export const AuthorizeUser = (user) => ({
  type: "AUTHORIZE_USER",
  payload: user,
});

export const AuthStart = (userCredentials) => ({
  type: "AUTH_START",
  payload: userCredentials,
});
export const AuthSuccess = (user) => ({
  type: "AUTH_SUCCESS",
  payload: user,
});
export const AuthError = (err) => ({
  type: "AUTH_ERROR",
  payload: err,
});

export const Logout = () => ({
  type: "LOGOUT",
});
