const express = require('express');

const AdminRouter = require('../controllers/users/AdminUserController');

const router = express.Router();

// ADMIN AUTH
router.post('/admin', AdminRouter);

module.exports = router;
