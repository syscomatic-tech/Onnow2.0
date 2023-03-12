require('dotenv').config();
const mongoose = require('mongoose');

// create a connect

const connectWithDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to Database');
    return db;
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

// export them
module.exports = {
  connectWithDB,
};
