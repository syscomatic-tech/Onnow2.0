const express = require('express');
const AdminController=require('../controllers/users/AdminUserController');


const router = express.Router();

// ADMIN AUTH

router.post("/admin-reg",AdminController.Registration);


module.exports = router;