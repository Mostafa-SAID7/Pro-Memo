/**
 * Database Configuration
 * Exports the database connection function
 */

const connectDB = require('../infrastructure/database/mongodb/connection');

module.exports = connectDB;
