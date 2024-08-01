const express= require('express');
const router= express.Router();
const Faculty= require('../models/facultyModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {verify} = require('../middlewares/auth');



const secret= 'Abc!1234%$#@';



router.get('/login',(req,res)=>{
    res.render('facultyLogin',{ error: null });
})
router.get('/signup',(req,res)=>{
    res.render('facultySignup');
})

router.post('/login',async (req,res)=>{
    try {
        const {email,password}=req.body;
        const faculty= await Faculty.findOne({email});
        if(!faculty){
            return res.render('adminLogin', {error: "Invalid email"});
        }
        const matchPassword = await bcrypt.compare(password,faculty.password);
        if(matchPassword) {
            const token= jwt.sign({email:email,role:"faculty"},secret);
            res.json({token});
        }
        else return res.render('facultyLogin', {error: "Invalid password"});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
    
})

router.post('/signup',async (req,res)=>{
    try{
        const {name,facultyId,email,password}= req.body;
        const hashedPassword= await bcrypt.hash(password,10);
        await Faculty.create({name,facultyId,email,password:hashedPassword});
    }catch(error){
        res.status(400).json(error);
    }

    res.redirect('login');
})

router.get('/protected',verify,(req,res)=>{
    res.send("hello from protected route");
})




module.exports=router;