const SendEmailUtility=require('../../utility/SendEmailUtility');
const generateOTP=require('../OTPService/OTP-Generate');
const SendOTP=require('../OTPService/SendOTP');

const AdminAuthService = async (req, res,UserModel) => {
    const { email } = req.body;

    try {
        // check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // generate and send OTP
        const otp = generateOTP();
        await SendOTP(email, otp);

        // save the OTP in the user document
        const newUser = new UserModel({
            email,
            otp,
        });
        await newUser.save();

        return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};


module.exports = AdminAuthService;