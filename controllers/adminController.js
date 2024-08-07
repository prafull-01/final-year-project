
const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'Abc!1234%$#@';

exports.getLoginPage = (req, res) => {
    res.render('adminLogin', { error: null });
};

exports.getSignupPage = (req, res) => {
    res.render('adminSignup');
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.render('adminLogin', { error: "Invalid email" });
        }
        const matchPassword = await bcrypt.compare(password, admin.password);
        if (matchPassword) {
            const token = jwt.sign({ email: email, role: "admin" }, secret);
            res.json({ token });
        } else {
            return res.render('adminLogin', { error: "Invalid password" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};

exports.signup = async (req, res) => {
    try {
        const { name, adminId, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await Admin.create({ name, adminId, email, password: hashedPassword });
        res.redirect('login');
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.protectedRoute = (req, res) => {
    res.send("hello from protected route");
};
