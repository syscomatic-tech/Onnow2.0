const AdminModel=require("../../models/UserModel");
const AdminCreateService=require('../../services/User/AdminAuthService');



// Admin Registration

exports.Registration=async (req,res)=>{
    let result=await AdminCreateService(req, AdminModel)

    res.status(200).json(result)
}
