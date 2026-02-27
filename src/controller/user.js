import UserModel from '../model/user.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: "Nama, Email, dan Password harus diisi!"})
    }
    try {
        const [existingUser] = await UserModel.getUserByEmail(email);
        if (existingUser > 0) {
            return res.status(400).json({message: "Email sudah digunakan!"});
        }

        const salt = await bcrypt.salt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = {
            name: name,
            email: email,
            password: hashedPassword,
            provider: 'local'
        };

        await UserModel.createNewUser(userData);
        res.status(201).json({ message: 'Registrasi berhasil, silahkan lakukan login.'})
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

export const login = async (req, res) => {
    const {name, password} = req.body;
    if (!email || !password) {
        res.status(400).json({message: 'Email dan Password harus diisi!'})
    }
    try {
        const [users] = await UserModel.getUserByEmail(email);
        const user = users[0];

        if (!user) {
            return res.status(400).json({ message: 'Email tidak ditemukan!'});
        };

        if (!user.password && user.provider == 'google') {
            return res.status(400).json({ message: 'Akun ini terdaftar menggunakan Google. Silahkan login with Google'})
        };

        const isPasswordMatch = await bcrypt.compare(password. user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Password salah!'})
        };

        const tokenPayload = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.json({
            message: "Login berhasil!",
            data: {
                user: tokenPayload,
                token: token
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
};