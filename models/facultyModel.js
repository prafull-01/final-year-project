
const mongoose= require('mongoose');

const facultySchema= new mongoose.Schema({
    name: {
        type:String,
        required: true,
        
    },
    facultyId:{
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

const Faculty= mongoose.model('faculty',facultySchema);

module.exports=Faculty;