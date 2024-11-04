const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Replace with a secure secret

// Signup function
exports.Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // console.log("user data -> ",username,email,password)

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email.',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully!',
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: 'Server error during signup.',
        });
    }
};


const createToken = (user) => {
    const { password, ...userWithoutPassword } = user.toObject(); // Exclude password
    const payload = {
        data: userWithoutPassword, // Or just include user ID
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both email and password.',
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        // Create a token with the user's information
        const token = createToken(user);

        // Set the token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        });

        res.status(200).json({
            success: true,
            token, // Optionally send back the token
            data: user, // Ensure sensitive information is not sent
            message: 'Login successful!',
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({
            success: false,
            message: 'Server error during login.',
        });
    }
};
