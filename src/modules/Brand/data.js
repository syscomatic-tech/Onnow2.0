require('dotenv').config()
const {faker} = require('@faker-js/faker')
const Brand = require("./model");
const {connectWithDB, disconnectFromDB} = require("../../config/mongo")


const seedDB = async () => {
    console.time()
    await connectWithDB()

    for (let i = 0; i < 3000000; i++) {

        const brand = {
            owner: {
                owner_id: faker.database.mongodbObjectId(),
                ownerName: faker.name.fullName(),
            },
            banner: faker.image.food(),
            logo: faker.image.avatar(),
            brandName: faker.company.name(),
            subDomain: faker.internet.domainSuffix(),
        }
        await Brand.create(brand)
    }


    console.timeEnd()
    disconnectFromDB()
}

seedDB()