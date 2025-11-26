// In-memory database (replace with real database later)
class Database {
  constructor() {
    this.users = [];
  }

  // User operations
  getAllUsers() {
    return this.users;
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  findUserByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  createUser(userData) {
    const user = {
      id: this.users.length + 1,
      ...userData,
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  updateUser(id, updates) {
    const user = this.findUserById(id);
    if (user) {
      Object.assign(user, updates);
    }
    return user;
  }

  deleteUser(id) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = new Database();
