const Faculty = require('../models/facultyModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'Abc!1234%$#@';

exports.getLoginPage = (req, res) => {
    res.render('facultyLogin', { error: null });
};

exports.getSignupPage = (req, res) => {
    res.render('facultySignup');
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const faculty = await Faculty.findOne({ email });
        if (!faculty) {
            return res.render('facultyLogin', { error: "Invalid email" });
        }
        const matchPassword = await bcrypt.compare(password, faculty.password);
        if (matchPassword) {
            const token = jwt.sign({ email: email, role: "faculty" }, secret);
            res.json({ token });
        } else {
            return res.render('facultyLogin', { error: "Invalid password" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};

exports.signup = async (req, res) => {
    try {
        const { name, facultyId, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await Faculty.create({ name, facultyId, email, password: hashedPassword });
        res.redirect('login');
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.protectedRoute = (req, res) => {
    res.send("hello from protected route");
};
