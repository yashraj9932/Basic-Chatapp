const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get Logged in User
// @route     Get /auth/currentuser
// @access    Public

exports.getLoggedUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorResponse("User Not Found", 404));
  }
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide both email and password", 404)
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse("User Not Found", 404));
  }
  if (!user.matchPassword(password)) {
    return next(new ErrorResponse("Invalid Credentials", 404));
  }
  sendTokenResponse(user, 200, res);
});

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return next(new ErrorResponse("Please provide all necessary details", 404));
  }

  const user = await User.create({ name, email, phone, password });
  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({ success: true, token });
};
