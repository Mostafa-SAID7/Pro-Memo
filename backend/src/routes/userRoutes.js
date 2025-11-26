const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.get('/', authMiddleware, userController.getAllUsers);

module.exports = router;
