require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectWithDB = async () => {
  try {
    const db = await mongoose.connect(URI, options);
    console.log('Connected to database');
    return db;
  } catch (err) {
    console.log(err);
    return process.exit(1);
  }
};

module.exports = {
  connectWithDB,
};
