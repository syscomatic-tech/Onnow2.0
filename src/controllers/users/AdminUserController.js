const express = require('express');

const UserModel = require('../../models/UserModel');
const AdminCreateService = require('../../services/User/AdminAuthService');

const router = express.Router();
// Admin Registration

const Registration = async (req, res) => {
  let result = await AdminCreateService(req, UserModel);
  res.status(200).json(result);
};

router.post('/admin-reg', Registration);

module.exports = router;
