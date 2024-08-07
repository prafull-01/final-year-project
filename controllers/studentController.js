
const Student = require('../models/studentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'Abc!1234%$#@';

exports.getLoginPage = (req, res) => {
    res.render('studentLogin', { error: null });
};

exports.getSignupPage = (req, res) => {
    res.render('studentSignup');
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });
        if (!student) {
            return res.render('studentLogin', { error: "Invalid email" });
        }
        const matchPassword = await bcrypt.compare(password, student.password);
        if (matchPassword) {
            const token = jwt.sign({ email: email, role: "student" }, secret);
            return res.redirect('https://shivanisingh122.github.io/FFCSTT/');
        } else {
            return res.render('studentLogin', { error: "Invalid password" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};

exports.signup = async (req, res) => {
    try {
        const { name, systemId, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await Student.create({ name, systemId, email, password: hashedPassword });
        res.redirect('login');
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.protectedRoute = (req, res) => {
    res.send("hello from protected route");
};
