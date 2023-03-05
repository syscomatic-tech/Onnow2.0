const express = require('express');
const AdminUserControllerr=require('../controllers/users/AdminUserController');


const router = express.Router();

// ADMIN AUTH

router.post("/admin-reg",AdminUserControllerr.Registration);


module.exports = router;