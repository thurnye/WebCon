import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/user.js';


export const register = async (req, res) => {
    try {
        const {
            firstName, lastName, email, password, 
            picture, friends, location, occupation
        } = req.body

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName, lastName, email, picture, friends, location, occupation, 
            viewedProfile: Math.floor(Math.random() * 100),
            impressions: Math.floor(Math.random() * 100),
            password: passwordHash
        })
        await newUser.save();
        res.status(200).json({msg: 'user created successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({err: 'Internal Server Error'});
    }
};


// Login a User
export const getLogIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).populate({
        path: 'friends',
        select: '_id firstName lastName picture location',
        })
        .exec();
    
      // If user is not found in the database
      if (!user) return res.status(400).json({ msg: 'User does not exist' });
  
      // If user is found, check the password
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  
      // If password is invalid
      if (!isPasswordValid) return res.status(401).json({ msg: 'Invalid email or password' });
  
      // If password is valid, generate a new token
      const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      const token = jwt.sign({ payload }, process.env.SECRET, { expiresIn: '24h' });
  
      // Create a user object without the password field
      const userWithoutPassword = { ...user.toObject() };
      delete userWithoutPassword.password;
  
      // Send the response with the token and user data (without password)
      res.status(200).json({ token, user: userWithoutPassword });
    } catch (error) {
      console.log(error);
      res.status(500).json({msg:'Internal Server Error', error: error});
    }
  };







