const brand = require('./model');

const addBrand = async (data) => {
  const newBrand = await brand.create(data);
  return newBrand;
};

module.exports = {
  addBrand,
};
