const createTokenUser = (user) => {
  return {
    userId: user.user_id,
    name: user.username,
    role: user.role,
  };
};
module.exports = createTokenUser;
