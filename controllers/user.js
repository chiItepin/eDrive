const UserService = require('../services/user')    
const passwordHash = require('password-hash');
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.getUsers = async function (req, res, next) {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    try {
        const users = await UserService.getUsers({}, page, limit);
        // console.log(res.userEmail);
        // console.log(res.userId);
        return res.status(200).json({ status: 200, data: users, message: "List of users" });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
}

exports.create = async function (req, res, next) {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    try {
        const { email, password, confirmPassword } = req.body;

        if (!email) {
            return res.status(400).json({status: 400, message: 'Email must be entered'});
        }
        if (!password || !confirmPassword) {
            return res.status(400).json({status: 400, message: 'Password must be entered'});
        }
        if (password !== confirmPassword) {
            return res.status(400).json({status: 400, message: 'Confirm your password'});
        }

        const checkUser = await UserService.getUser({email: email}, page, limit);
        if (checkUser) {
            return res.status(400).json({status: 400, message: 'User already exists'});
        }

        // Hash password
        const hashedPassword = passwordHash.generate(password);
        req.body.password = hashedPassword;

        const createdUser = await UserService.create(req.body);

        // Generate auth token
        const authToken = jwt.sign({ email: email, id: createdUser.id }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
        createdUser.token = authToken;
        
        return res.status(200).json({ status: 200, data: createdUser, message: "Account created" });
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
}

exports.authenticate = async function (req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({status: 400, message: 'Email must be entered'});
        }
        if (!password) {
            return res.status(400).json({status: 400, message: 'Password must be entered'});
        }

        // Hash password
        const checkUser = await UserService.getUser({email: email});
        if (checkUser) {
            if (passwordHash.verify(password, checkUser.password)) {
                // Generate auth token
                const authToken = jwt.sign({ email: checkUser.email, id: checkUser.id }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
                return res.status(200).json({ status: 200, data: authToken, message: "Account authenticated" });
            } else {
                return res.status(400).json({status: 400, message: 'Account not found'});
            }
        }
        else {
            return res.status(400).json({status: 400, message: 'Account not found'});
        }

    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
}