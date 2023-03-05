const express = require('express');

const AdminRoutes = require('../controllers/users/AdminUserController');

const router = express.Router();

// ADMIN AUTH
router.use('/admin', AdminRoutes);

module.exports = router;

// api/v1/admin/reg
