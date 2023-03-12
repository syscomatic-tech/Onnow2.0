const {brand}=require("./model")
const addBrand = async (data) => {
    const brand= await brand.insertOne(data)

}