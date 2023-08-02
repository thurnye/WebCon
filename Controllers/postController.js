import User from '../Models/user.js';
import Post from '../Models/post.js';
import {postActionTypes} from '../common/enums.js'

// Post A Post
export const createPost = async (req, res) => {
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
// Get A Post Feed
export const getFeedPost = async (req, res) => {
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
// Get A Post Feed
export const likeSavePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const actionType = req.params.actionType;
        const user = await User.findById(id);

        if(actionType === postActionTypes.like){
            user.likedPosts.push(postId);
            const post = await Post.findById(postId);
            post.likes += 1
        }
        if(actionType === postActionTypes.save){
            user.savedPosts.push(postId);
        }
        await user.save();
        await Post.save();

        //just for postman, delete when UI is ready
        const savedUserFriend = await User.findById(id)
        .populate('friends')
        .populate('posts')
        .populate('likedPosts')
        .populate('savedPosts')
        .exec();

        res.status(200).json(savedUserFriend);
        
    } catch (error) {
        console.log(error);
        res.status(400).json('Bad Credentials');
    }
};








