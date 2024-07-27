const express= require('express');
const router= express.Router();
const Student= require('../models/studentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {verifyStudent} = require('../middlewares/auth');



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
        const student= await Student.findOne({email});
        if(!student){
            return res.send("user not found");
        }
        const matchPassword = await bcrypt.compare(password,student.password);
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
        const {name,systemId,email,password}= req.body;
        const hashedPassword= await bcrypt.hash(password,10);
        await Student.create({name,systemId,email,password:hashedPassword});
    }catch(error){
        res.status(400).json(error);
    }

    res.redirect('login');
})

router.get('/protected',verifyStudent,(req,res)=>{
    res.send("hello from protected route");
})




module.exports=router;