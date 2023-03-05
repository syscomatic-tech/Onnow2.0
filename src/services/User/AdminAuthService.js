const generateOTP = require('../OTPService/OTP-Generate');
const SendOTP = require('../OTPService/SendOTP');
const {BadRequest} = require('../../utility/errors');

const registerAdmin = async (body, UserModel) => {
    const {name, email, phoneNumber, password} = body;

    if (!password) {
        throw new BadRequest('Please enter a password');
    }


    //checks if user exists
    const userExists = await UserModel.findOne({email});


    // save the OTP in the user document
    const newUser = new AdminModel({
        email, otp,
    });
    await newUser.save();

    // return res.status(200).json({ message: 'OTP sent successfully' });
    return {status: "Success", message: "OTP sent successfully"}
}
catch
(error)
{
    console.log(error);
    // return res.status(500).json({ error: 'Something went wrong' });
    return {status: "Failed", err: "Something went wrong"}
}

if (userExists) {
    throw new BadRequest('User already exists');
}

// generate and send OTP
const otp = generateOTP();
await SendOTP(email, otp);

// save the OTP in the user document
const newUser = new UserModel({
    name, phoneNumber, email, password, otp,
});

const user = await newUser.save();

return user;

}
;

module.exports = {registerAdmin};
