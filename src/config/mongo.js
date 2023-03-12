require('dotenv').config()

// import the mongoclient

const {MongoClient} = require("mongodb");


// create a connect
const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
});

let _db = null;
const connectWithDB = async () => {
    try {

        console.log("connecting to MongoDB");
        await client.connect();

        _db = client.db("OnnowApp");
        console.log("connected to MongoDB");
        return _db;
    } catch (e) {
        await client.close()
        console.log(e)
    }

};


const getDb = () => {
    return _db;
};


// export them
module.exports = {
    connectWithDB,
    getDb

};