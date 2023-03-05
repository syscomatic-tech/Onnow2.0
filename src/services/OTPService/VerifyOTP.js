const { AdminModel } = require('../../models');
const { NotFound, BadRequest } = require('../../utility/errors');

const verifyOTP = async (body) => {
  const { email, otp } = body;
  // verify the OTPs

  const userExists = await AdminModel.findOne({ email });
  console.log("test",userExists)

  if (!userExists) {
    throw new NotFound('User does not exist with this email address');
  }

  if (userExists.otp !== otp) {
    throw new BadRequest('Invalid OTP');
  }

 const  updatedUser= await AdminModel.updateOne({ email }, { $unset: { otp: 1 },isActive:true,isVerified:true });



  return updatedUser;
};

module.exports = { verifyOTP };
