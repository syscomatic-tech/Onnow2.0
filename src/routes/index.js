const express = require('express');
const router = express.Router();
const brandRoute = require("../modules/Brand/controller");


router.use("/brand", brandRoute)

module.exports = router;

