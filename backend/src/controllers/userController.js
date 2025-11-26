const db = require('../config/database');

// Get all users
const getAllUsers = (req, res) => {
  try {
    const users = db.getAllUsers().map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      createdAt: u.createdAt
    }));
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllUsers
};
