const brand = require('./model');

const addBrand = async (data) => {
  const newBrand = await brand.create(data);
  return newBrand;
};

const getBrands = async () => {
  const brands = await brand.find({});
  return brands;
};

module.exports = {
  addBrand,
  getBrands,
};
