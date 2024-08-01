
const mongoose= require('mongoose');

const adminSchema= new mongoose.Schema({
    name: {
        type:String,
        required: true,
        
    },
    adminId:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required: true,

    }
    
})

const Admin= mongoose.model('admin',adminSchema);

module.exports=Admin;