const { AdminModel } = require('../../models');
const { NotFound, BadRequest } = require('../../utility/errors');

const VerifyOTP = async (body) => {
  const { email, otp } = body;
  // verify the OTPs

  const userExists = await AdminModel.findOne({ email });

  if (!userExists) {
    throw new NotFound('User does not exist with this email address');
  }

  if (!userExists.otp === otp) {
    throw new BadRequest('Invalid OTP');
  }

  await AdminModel.updateOne({ email }, { $unset: { otp: 1 } });

  return userExists;
};

module.exports = { VerifyOTP };
