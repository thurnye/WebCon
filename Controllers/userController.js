import User from '../Models/user.js';

// GET A USER
export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const user = await User.findById(id)
        .populate('friends')
        .exec();

        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(400).json('Bad Credentials');
    }
};

// ADD A FRIEND
export const postAddRemoveFriend = async (req, res) => {
    try {
        const id = req.params.id;
        const friendId = req.params.friendId;
        const user = await User.findById(id);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((frd) => frd._id.toString() !== friendId.toString())
            console.log(user);
        }else{
            user.friends.push(friendId);
        }
        await user.save();

        const savedUserFriend = await User.findById(id).populate('friends').exec();
        res.status(200).json(savedUserFriend);
        
    } catch (error) {
        console.log(error);
        res.status(400).json('Bad Credentials');
    }
};







