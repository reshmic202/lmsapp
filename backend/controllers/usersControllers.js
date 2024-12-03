import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const userRoutesInit = async (req, res) => {
    res.json({
        message: "User routes initialized successfully"
    })
}

export const createNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // finding if the users is already registered or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" })
        }

        // using bcrypt for password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // creating a new user
        const newUser = new User({ name, email, password: hashedPassword });

        const ifDone = await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.SEC_KEY, {
            expiresIn: "7d"
        })
        if (ifDone) {
            return res.status(201).json({
                message: "User created successfully",
                token: token
            })
        }
        res.status(400).json({ message: "Something went wrong!" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // finding the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        // comparing the hashed password with the provided password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        // generating a JWT token
        const token = jwt.sign({ id: user._id }, process.env.SEC_KEY, {
            expiresIn: "7d"  // token will expire in 24 hours
        })
        res.status(201).json({ message: "User logged in successfully", token: token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getUserDetailsWithToken = async (req, res) => {
    try {
        const token = req.params.token
        // verifying the token
        const decoded = jwt.verify(token, process.env.SEC_KEY)
        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" })
        }
        // finding the user with the token
        const user = await User.findById(decoded.id).select("-password")
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(201).json({ message: "User details retrieved successfully", user: user })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}