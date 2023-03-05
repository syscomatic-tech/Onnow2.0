const generateOTP = require('../OTPService/OTP-Generate');
const SendOTP = require('../OTPService/SendOTP');
const {BadRequest} = require('../../utility/errors');
const {GeneralError} = require('../../utility/errors');
const {NotFound} = require('../../utility/errors');
const{MongoError}=require('../../utility/errors');
const{handleError}=require('../../utility/errors');



// ADMIN REG SERVICE
const registerAdmin = async (body, UserModel) => {
    const {name, email, phoneNumber, password} = body;

    if (!password) {
        throw new BadRequest('Please enter a password');
    }

    //checks if user exists
    const userExists = await UserModel.findOne({email});

    if (userExists) {
        throw new BadRequest('User already exists');
    }

    // generate and send OTP
    const otp = generateOTP();
    await SendOTP(email, otp);

    // save the OTP in the user document
    const newUser = new UserModel({
        name,
        phoneNumber,
        email,
        password,
        otp,
    });

    const user = await newUser.save();

    return user;
};


// ADMIN EMAIL OTP VERIFY

const verifyOTP = async (body) => {
    const {email, otp} = body;

    try {
        // Find the user by email and verify the OTP
        const user = await UserModel.findOne({email, otp});
        if (!user) {
            throw new BadRequest('Invalid OTP');
        }

        // Update the user's isActive and isVerified properties
        user.isActive = true;
        user.isVerified = true;
        await user.save();

        return user;
    } catch (err) {
        throw err;
    }
};



module.exports = {registerAdmin, verifyOTP};