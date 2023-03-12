const { getDb } = require("../../config/mongo");

const collectionName = "brand";

const getCollection = () => {
    console.log(`getCollection: ${collectionName}`);
    const db = getDb();
    const collection = db.collection(collectionName);
    return collection;
};

module.exports = {
    brand: getCollection(),
    name: collectionName,
};