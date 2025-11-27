/**
 * User Service
 * Business logic for user operations
 */

const User = require('../../models/user/User');
const { NotFoundError, ValidationError } = require('../../../shared/errors');

class UserService {
  async getAllUsers(filters = {}) {
    const query = {};
    
    if (filters.role) query.role = filters.role;
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } }
      ];
    }
    
    return User.find(query)
      .select('-password')
      .sort({ createdAt: -1 });
  }

  async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    return user;
  }

  async updateUser(userId, updateData) {
    // Prevent password update through this method
    delete updateData.password;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    return user;
  }

  async deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    return user;
  }

  async searchUsers(searchTerm) {
    return User.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } }
      ]
    })
      .select('name email avatar')
      .limit(10);
  }

  async updateUserRole(userId, role) {
    const validRoles = ['user', 'admin', 'manager'];
    
    if (!validRoles.includes(role)) {
      throw new ValidationError('Invalid role');
    }
    
    return this.updateUser(userId, { role });
  }

  async updateUserStatus(userId, status) {
    const validStatuses = ['active', 'inactive', 'suspended'];
    
    if (!validStatuses.includes(status)) {
      throw new ValidationError('Invalid status');
    }
    
    return this.updateUser(userId, { status });
  }
}

module.exports = new UserService();
