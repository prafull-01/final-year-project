const express= require('express');
const router= express.Router();
const User= require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {verifyUser} = require('../middlewares/auth');



const secret= 'Abc!1234%$#@';


router.get('/',(req,res)=>{
    res.send("hello form home page");
})
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.post('/login',async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.send("user not found");
        }
        const matchPassword = await bcrypt.compare(password,user.password);
        if(matchPassword) {
            const token= jwt.sign({email:email},secret);
            res.json({token});
        }
        else res.send("password is incorrect");
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
    
})

router.post('/signup',async (req,res)=>{
    try{
        const {name,email,password}= req.body;
        const hashedPassword= await bcrypt.hash(password,10);
        await User.create({name,email,password:hashedPassword});
    }catch(error){
        res.status(400).json(error);
    }

    res.redirect('login');
})

router.get('/protected',verifyUser,(req,res)=>{
    res.send("hello from protected route");
})




module.exports=router;