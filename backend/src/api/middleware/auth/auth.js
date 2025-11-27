/**
 * Authentication Middleware
 */

const { verifyToken } = require('../../../shared/utils/helpers/jwt');
const { UnauthorizedError } = require('../../../shared/errors');
const User = require('../../../core/models/user/User');

const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedError('Not authorized to access this route');
    }

    // Verify token
    const decoded = verifyToken(token);

    // Get user from token
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    // Attach user to request
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    next(new UnauthorizedError(error.message));
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new UnauthorizedError('You do not have permission to perform this action'));
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo
};
