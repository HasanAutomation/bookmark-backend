const jwt = require('jsonwebtoken');

class JwtService {
  generateAccessToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: '30d',
    });
    return accessToken;
  }
  validateAccessToken(token) {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  }
}

const instance = new JwtService();
module.exports = instance;
