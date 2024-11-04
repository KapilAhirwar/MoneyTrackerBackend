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


// Login functionS
const createToken = (user) => {
    // Define the payload
    const payload = {
        data:user,
    };
    // Sign the token with your secret key
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
};

// Usage in the login function
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        // Create a token with the user's information
        const token = createToken(user);

        res.status(200).json({
            success: true,
            token, // Send the token back to the client
            data: user, // Send user data (exclude sensitive information)
            message: 'Login successful!',
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: 'Server error during login.',
        });
    }
};