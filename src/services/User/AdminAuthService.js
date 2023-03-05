const generateOTP = require('../OTPService/OTP-Generate');
const SendOTP = require('../OTPService/SendOTP');
const {BadRequest} = require('../../utility/errors');
const {GeneralError} = require('../../utility/errors');
const {NotFound} = require('../../utility/errors');
const {MongoError} = require('../../utility/errors');
const {handleError} = require('../../utility/errors');


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
    user.password = undefined;
    user.otp = undefined;
    return user;
};


module.exports = {registerAdmin};