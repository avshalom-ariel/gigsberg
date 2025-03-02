const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/auth-models');

// Register User
exports.registerUser = async (req, res) => {
    console.log("Register request received");

    try {
        const { name, email, password } = req.body;

        // Hash password
        const round = Number(process.env.ROUNDS);
        const salt = await bcrypt.genSalt(round);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check if user exists
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (!user) {
            return res.status(400).json({ message: 'The user already exist' });
        }

        // Create JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        res.status(201).json({
            message: 'User successfully registered',
            user: user,
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    console.log("Login request received");
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            console.log("User does not exist");
            return res.status(404).json({ message: 'User not found' });

        }
        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid userId or password' });
        }

        // Create JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        res.status(200).json({
            message: 'Logged in successfully',
            user: user,
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


