/**
 * Main Routes Entry Point
 */

const express = require('express');
const router = express.Router();
const v1Routes = require('./api/routes/v1');

// Mount API v1 routes
router.use('/v1', v1Routes);

// Default to v1 for backward compatibility
router.use('/', v1Routes);

module.exports = router;
