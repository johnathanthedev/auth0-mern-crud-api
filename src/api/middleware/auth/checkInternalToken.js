const TokenService = require("../../../services/TokenService")

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  !token && res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const tokenService = new TokenService()
    const decoded_token = tokenService.decode_token(token)
    req.user_email = decoded_token.user_email;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
