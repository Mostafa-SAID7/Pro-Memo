/**
 * User Routes
 */

const express = require('express');
const router = express.Router();
const { user: userController } = require('../../controllers');
const { protect, validators, validate } = require('../../../middleware');

// All routes require authentication
router.use(protect);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
