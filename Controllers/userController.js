import User from '../Models/user.js';
import jwt from 'jsonwebtoken';

// import { refindUser, getFriendsFeeds } from './postController.js';

// GET A USER
export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        .select('_id firstName lastName picture location friends mediaPlatforms')
        .exec();

        // If user is not found in the database
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Internal Server Error', error: error});
    }
};


// ADD A FRIEND
export const postAddRemoveFriend = async (req, res) => {
    try {
        const id = req.params.id;
        const friendId = req.params.friendId;
        const user = await User.findById(id);
        let existing = false;

        // If user is not found in the database
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((frd) => frd._id.toString() !== friendId.toString())
            existing = true;
        }else{
            user.friends.push(friendId);
            existing = false;
        }
        await user.save();

        // const updatedUser = await refindUser(id);
        const updatedUser = await User.findById(id)
        .populate({
            path: 'friends',
            select: '_id firstName lastName picture',
          })
        .exec();
        res.status(200).json({
            msg: existing ? 'Friend Removed Successful!' : 'Friend Added Successfully!',
            friends: updatedUser.friends
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Internal Server Error', error: error});
    }
};


//Get Friends
export const getUserFriends = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        .populate({
              path: 'friends',
              select: '_id firstName lastName picture mediaPlatforms',
            })
        .exec();

        // If user is not found in the database
        if (!user) return res.status(400).json({ msg: 'User does not exist' });
        

        res.status(200).json(user.friends);

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Internal Server Error', error: error});
    }
};


export const searchUser = async (req, res) => {
    
}

// POSTING Updated User
export const updateUser = async (req, res) => {
    try {
        const { id, firstName, lastName, picture, location, occupation, mediaPlatforms } = req.body;

        const user = await User.findById(id);

        // If user is not found in the database
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.picture = picture;
        user.location = location;
        user.occupation = occupation;
        user.mediaPlatforms = mediaPlatforms;

        const updatedUser = await user.save();

        const payload = {
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            mediaPlatforms: updatedUser.mediaPlatforms
        };

        const token = jwt.sign({ payload }, process.env.SECRET, { expiresIn: '24h' });

        // Create a user object without the password field
        const userWithoutPassword = { ...updatedUser.toObject() };
        delete userWithoutPassword.password;

        res.status(200).json({ token, user: userWithoutPassword });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server Error', error: error });
    }
}






