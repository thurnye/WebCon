import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/user.js';


export const register = async (req, res) => {
    try {
        const {filename, path} = req.file;
        // console.log(filename, path);
        const {
            firstName, lastName, email, password, 
            picturePath, friends, location, occupation
        } = req.body

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName, lastName, email, picturePath:path, friends, location, occupation, 
            viewedProfile: Math.floor(Math.random() * 100),
            impressions: Math.floor(Math.random() * 100),
            password: passwordHash
        })
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);

    } catch (error) {
        console.log(error);
        res.status(400).json('Bad Credentials');
    }
};


// Login a User
export const getLogIn = async (req, res) => {
    try {
        console.log(req.body);

        const user = await User.findOne({ email: req.body.email }).exec();

        // If user is not found in the database
        if (!user) return res.status(404).json('Invalid email or password');

        // If user is found, check the password
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        // If password is invalid
        if (!isPasswordValid) return res.status(401).json('Invalid password');

        // If password is valid, generate a new token
        const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
        res.json(token);
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
};







