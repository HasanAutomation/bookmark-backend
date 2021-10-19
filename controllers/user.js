const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const passwordService = require('../services/password-service');
const jwtService = require('../services/jwt-service.service');

// @POST api/v1/users
// @desc Create an User
// @access public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) return next(new ErrorResponse(400, 'Email is taken'));
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @POST api/v1/users/login
// @desc Login User
// @access public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return next(new ErrorResponse(400, 'Email is not provided'));
  if (!password)
    return next(new ErrorResponse(400, 'Password is not provided'));

  const userExists = await User.findOne({ email }).populate('bookmarks');

  if (!userExists) return next(new ErrorResponse(404, 'User does not exist'));

  // match password
  if (!(await passwordService.matchPassword(password, userExists.password)))
    return next(new ErrorResponse(400, 'Password did not match'));

  const user = {
    ...userExists.toObject(),
    password: undefined,
  };

  res.status(200).json({
    success: true,
    data: user,
    accessToken: jwtService.generateAccessToken({ _id: user._id }),
  });
});

// @POST api/v1/users/me
// @desc Get logged in User
// @access private
exports.currentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user).populate('bookmarks');

  if (!user) return next(new ErrorResponse(404, 'User not found'));
  res.status(200).json({
    success: true,
    data: user,
    accessToken: jwtService.generateAccessToken({ _id: user._id }),
  });
});
