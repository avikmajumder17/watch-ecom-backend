const User = require("../models/userModel");
const jwt = require("jsonwebtoken");



const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN 
    });
};

exports.signUp = async (req, res, next) => {
    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });

        const token = signToken(newUser._id);

        res.status(201).json({
            status: "success",
            token,
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const err = new Error ("Please provide email and password!");
            err.statusError = 400;

            return next(err);
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.correctedPassword(password, user.password))) {
            const err = new Error ("Incorrect email or password!");
            err.statusError = 401;

            return next(err);
        }

        const token = signToken(user._id);

        res.status(200).json({
            status: "success",
            token            
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        });
    }
};