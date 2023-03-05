<<<<<<< HEAD
const AdminModel=require("../../models/UserModel");
const AdminCreateService=require('../../services/User/AdminAuthService');
=======
const express = require('express');
const models = require('../../models');
>>>>>>> 8107e828c9d1a807fe6bde837531add16189b337

const { AdminModel } = models;

const adminAuthService = require('../../services/User/AdminAuthService');

const router = express.Router();
// Admin Registration

<<<<<<< HEAD
exports.Registration=async (req,res)=>{
    let result=await AdminCreateService(req, AdminModel)

    res.status(200).json(result)
}
=======
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
>>>>>>> 8107e828c9d1a807fe6bde837531add16189b337
