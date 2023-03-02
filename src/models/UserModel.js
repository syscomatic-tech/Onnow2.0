const mongoose =require('mongoose');
const DataSchema=mongoose.Schema({
    name:{type:String,max:30,required:true},
    email:{type:String,unique:true,required: true},
    phone_number:{type:String,max: 13},
    password:{type:String,max:6},
    role:{
        type:String,
        default:"ACO",
        // ACO=Account Owner,BM=Brand Manager,OM=OutletManager
        enum:["ACO","BM","OM"],
        required:true
    }

})