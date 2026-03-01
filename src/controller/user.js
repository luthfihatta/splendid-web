import UserModel from '../model/user.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register Function
export const register = async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required!"})
    }
    try {
        const [existingUser] = await UserModel.getUserByEmail(email);
        if (existingUser > 0) {
            return res.status(400).json({message: "Email is already in use!"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = {
            name: name,
            email: email,
            password: hashedPassword,
            provider: 'local'
        };

        await UserModel.createNewUser(userData);
        return res.status(201).json({ message: 'Registration successful. Please log in'})
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

// Login Function
export const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: 'Email and password are required!'})
    }
    try {
        const [users] = await UserModel.getUserByEmail(email);
        const user = users[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found!'});
        };

        if (!user.password && user.provider == 'google') {
            return res.status(400).json({ message: 'Account registered with Google. Please use log in with Google.'})
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Incorrect password!'})
        };

        const tokenPayload = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.json({
            message: "Login successful!",
            data: {
                user: tokenPayload,
                token: token
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Server Error",
            serverMessage: error.message
        });
    }
};

// Google Login Function
export const googleLogin = async (req, res) => {
    const {googleToken} = req.body;
    if (!googleToken) {
        return res.status(400).json({message: 'Google token is required!'})
    }
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload.email;
        const name = payload.name;
        const google_id = payload.sub;

        const [users] = await UserModel.getUserByEmail(email);
        let user = users[0];

        if (!user) {
            const newUserData = {
                name: name,
                email: email,
                google_id: google_id
            };

            await UserModel.createGoogleUser(newUserData);
            
            const [newUsers] = await UserModel.getUserByEmail(email);
            user = newUsers[0];
        }
        
        const tokenPayload = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.json({
            message: "Google login successful!",
            data: {
                user: tokenPayload,
                token: token
            }
        })
    } catch (error) {
        console.error("Google Auth Error:", error.message);
        return res.status(401).json({
            message: "Invalid or expired Google Token"
        });
    }
}