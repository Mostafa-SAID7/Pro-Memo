/**
 * User Routes
 */

const express = require('express');
const router = express.Router();
const { user: userController } = require('../../../controllers');
const { protect, validators, validate, restrictTo } = require('../../../middleware');

// All routes require authentication
router.use(protect);

router.get('/', userController.getAllUsers);
router.get('/search', userController.searchUsers);
router.get('/:id', validators.mongoId, validate, userController.getUserById);
router.put('/:id', validators.mongoId, validate, userController.updateUser);
router.delete('/:id', validators.mongoId, validate, restrictTo('admin'), userController.deleteUser);

module.exports = router;
