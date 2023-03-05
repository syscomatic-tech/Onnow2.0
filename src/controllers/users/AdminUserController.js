const express = require('express');
const models = require('../../models');

const { AdminModel } = models;

const adminAuthService = require('../../services/User/AdminAuthService');

const router = express.Router();
// Admin Registration

const Registration = async (req, res, next) => {
  try {
    const user = await adminAuthService.registerAdmin(req.body, AdminModel);

    res.status(200).json({
      message: 'Admin successfully registered',
      user,
    });
  } catch (err) {
    next(err);
  }
};

// -> /admin/reg
router.post('/reg', Registration);

module.exports = router;
