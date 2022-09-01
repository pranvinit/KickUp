const createTokenUser = (user) => {
  return {
    userId: user.user_id,
    username: user.username,
    role: user.role,
  };
};
module.exports = createTokenUser;
