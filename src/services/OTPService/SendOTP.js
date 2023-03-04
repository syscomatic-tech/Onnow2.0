const SendOTP = async (email, otp) => {
    // send the OTP to the given email address
    const emailText = `Your OTP is: ${otp}`;
    const emailSubject = 'OTP Verification';
    await SendEmailUtility(email, emailText, emailSubject);
};

module.exports=SendOTP;