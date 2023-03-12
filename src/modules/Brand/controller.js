const express = require('express');
const router = express.Router();
const brandServices = require('./service');

//Create Brand

const createBrand = async (req, res, next) => {
  try {
    const brand = await brandServices.addBrand(req.body);
    res.status(200).json({ message: 'Brand SuccessFully Created!', brand });
  } catch (e) {
    next(e, req, res);
  }
};





// UpdateBrand By ID
const updateBrandById = () => {};
// Delete brand
const deleteBrand = () => {};

// GetBrand byID
const getBrandById = () => {};
// GetALL Brand By ID

const getAllBrand = async () => {
  try {
    const brands = await brandServices.getBrands();
    res.status(200).json({ length: brands.length, brands });
  } catch (err) {
    next(err, req, res);
  }
};

router.get('/', getAllBrand);
router.get('/:id', getBrandById);
router.post('/', createBrand);
router.put('/:id', updateBrandById);
router.delete('/:id', deleteBrand);

module.exports = router;
