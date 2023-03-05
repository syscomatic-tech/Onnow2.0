const generateOTP = require('../OTPService/OTP-Generate');
const SendOTP = require('../OTPService/SendOTP');
const { BadRequest } = require('../../utility/errors');
const { GeneralError } = require('../../utility/errors');
const { NotFound } = require('../../utility/errors');
const { MongoError } = require('../../utility/errors');
const { handleError } = require('../../utility/errors');
const { AdminModel } = require('../../models');
const CreateToken = require('../../utility/CreateToken');

// ADMIN REG SERVICE
const registerAdmin = async (body, UserModel) => {
  const { name, email, phoneNumber, password } = body;

  if (!password) {
    throw new BadRequest('Please enter a password');
  }

  //checks if user exists
  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    throw new BadRequest('User already exists');
  }

  // generate and send OTP
  const otp = generateOTP();
  ``;
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

// ADMIN LOGIN SERVICE

const adminLoginService = async (body) => {
  const { email, password } = body;
  console.log('check passowrd', password);

  const user = await AdminModel.findOne({ email }).select(
    'name email password'
  );

  if (!user) {
    throw new BadRequest('Invalid Credentials');
  }

  const isPassword = await user.authenticate(password);

  if (!isPassword) {
    throw new BadRequest('Invalid Credentials');
  }

  const token = await CreateToken(user.email);

  user.password = undefined;

  return { token, user };
};

module.exports = { registerAdmin, adminLoginService };
