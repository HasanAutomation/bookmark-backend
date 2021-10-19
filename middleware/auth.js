const ErrorResponse = require('../utils/errorResponse');
const jwtService = require('../services/jwt-service.service');

const auth = (req, res, next) => {
  // Get token
  const accessTokenString = req.headers['authorization'];

  try {
    if (!accessTokenString) return next(new ErrorResponse(401, 'Unauthorized'));
    const accessToken = accessTokenString.split(' ')[1];

    // Get Valid token
    const user = jwtService.validateAccessToken(accessToken);

    if (!user) return next(new ErrorResponse(401, 'Unauthorized'));

    req.user = user._id;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
