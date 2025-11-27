/**
 * Authentication Service
 * Business logic for authentication
 */

const User = require('../../models/user/User');
const { generateToken } = require('../../../shared/utils/helpers/jwt');
const { hashPassword, comparePassword } = require('../../../shared/utils/helpers/password');
const { UnauthorizedError, ConflictError, NotFoundError } = require('../../../shared/errors');

class AuthService {
  async register(name, email, password) {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate token
    const token = generateToken({ id: user._id, email: user.email });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  async login(email, password) {
    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken({ id: user._id, email: user.email });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  async getCurrentUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };
  }

  async updateProfile(userId, updates) {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Check if email is being changed and if it's already taken
    if (updates.email && updates.email !== user.email) {
      const existingUser = await User.findOne({ email: updates.email });
      if (existingUser) {
        throw new ConflictError('Email already in use');
      }
    }

    // Update user
    Object.assign(user, updates);
    await user.save();

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Verify current password
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Current password is incorrect');
    }

    // Hash new password
    user.password = await hashPassword(newPassword);
    await user.save();
  }

  async logout(userId) {
    // Implement token blacklist or session invalidation if needed
    return true;
  }

  async refreshToken(refreshToken) {
    // Implement refresh token logic
    throw new Error('Not implemented');
  }
}

module.exports = new AuthService();
