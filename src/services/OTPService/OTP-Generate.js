const crypto = require('crypto');

// Generate a random 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + crypto.randomInt(900000));
};


module.exports = generateOTP;