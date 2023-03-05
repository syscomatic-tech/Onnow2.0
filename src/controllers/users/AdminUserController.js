const express = require('express');
const {AdminModel} = require('../../models');

const adminAuthService = require('../../services/User/AdminAuthService');
const otpServices = require('../../services/OTPService/VerifyOTP');
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


// Admin Email OTP VERIFY

const adminOTPVerify = async (req, res, next) => {
    try {
        const user = await otpServices.verifyOTP(req.body);
        res.status(200).json({
            message: 'OTP verification successfull',
        })

    } catch
        (err) {
        next(err);
    }
}


router.post("/otp-verify", adminOTPVerify)
router.post('/reg', Registration);


module.exports = router;