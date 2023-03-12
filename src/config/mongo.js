require('dotenv').config();
const mongoose = require('mongoose');

// create a connect

const connectWithDB = async () => {
    try {
        // const db = await mongoose.connect(process.env.MONGODB_URI);
        const db = await mongoose.connect("mongodb://127.0.0.1:27017/OnnowApp");
        console.log('Connected to Database');
        return db;
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

const disconnectFromDB = () => {
    return mongoose.connection.close();
}

// export them
module.exports = {
    connectWithDB,
    disconnectFromDB
};
