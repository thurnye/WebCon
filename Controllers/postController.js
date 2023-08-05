import User from '../Models/user.js';
import Post from '../Models/post.js';
import Comment from '../Models/comment.js'
import {postActionTypes} from '../common/enums.js'

// Post A Post
export const createPost = async (req, res) => {
    try {
        const {post, location, images, author} = req.body
        const newPost = new Post({post, location, images, author})
        
        const savedPost = await newPost.save();
        const user = await User.findById(author);
        user.posts.push(savedPost._id);
        await user.save();
        res.status(200).json(savedPost);

    } catch (error) {
        console.log(error);
        res.status(400).json('Bad Credentials');
    }
};
// Get A Post Feed
export const getUserPost = async (req, res) => {
    try {
        
        const user = await User.findById(id)
        .populate('friends')
        .populate('posts')
        .populate('likedPosts')
        .populate('savedPosts')
        .exec();

        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(400).json('Bad Credentials');
    }
};
// Get A Post Feed
async function populateReplies(comment) {
    if (comment.replies.length === 0) {
      return comment;
    }
  
    const populatedReplies = await Promise.all(
      comment.replies.map(async (replyId) => {
        const reply = await Comment.findById(replyId)
        .populate({ 
            path: 'user', 
            select: '_id firstName lastName picturePath' 
        } ).exec()
        return populateReplies(reply);
      })
    );
  
    comment.replies = populatedReplies;
    return comment;
  }

export const getFeedPost = async (req, res) => {
    try {
      const id = req.params.userId;
      // Find the user by the provided userId
      const user = await User.findById(id).exec();
  
      // Check if the user exists
      if (!user) {
        throw new Error('User not found');
      }
  
      // Get an array of the user's friends' ObjectIds
      const friendsIds = user.friends.map((friend) => friend.toString());
  
      // Find all the posts where the author's ObjectId is in the friendsIds array
      const friendsPosts = await Post.find({ author: { $in: friendsIds } })
        .populate('author', '_id firstName lastName picturePath')
        .populate({
          path: 'comments',
          select: '_id comment user replies createdAt',
          populate: [
            {
              path: 'user',
              select: '_id firstName lastName picturePath',
            },
            {
              path: 'replies',
              select: '_id comment user replies createdAt',
              populate: {
                path: 'user',
                select: '_id firstName lastName picturePath',
              },
            },
          ],
        })
        .exec();
  
      // Populate nested replies using the recursive function
      const populatedPosts = await Promise.all(
        friendsPosts.map(async (post) => {
          const comments = await Promise.all(
            post.comments.map(async (comment) => {
              const populatedComment = await populateReplies(comment);
              populatedComment.replies.sort((a, b) => b.createdAt - a.createdAt); // Sort replies by most recent
              return populatedComment;
            })
          );
          // Sort comments by most recent
          post.comments = comments.sort((a, b) => b.createdAt - a.createdAt); 
          return post;
        })
      );
  
      populatedPosts.sort((a, b) => b.createdAt - a.createdAt); // Sort posts by most recent
  
      res.status(200).json(populatedPosts);
    } catch (error) {
      console.error('Error fetching user friends posts:', error);
      res.status(400).json('Bad Credentials');
    }
  };
  



























// Get A Post Feed
export const likeSavePost = async (req, res) => {
    try {
        console.log(req);
        const id = req.params.id;
        const postId = req.params.postId;
        const actionType = req.params.actionType;
        const user = await User.findById(id);
        const post = await Post.findById(postId);

        if(actionType === postActionTypes.like){
            user.likedPosts.push(postId);
            console.log
            post.likes += 1
        }
        if(actionType === postActionTypes.save){
            user.savedPosts.push(postId);
        }
        await user.save();
        await post.save();

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


//Creating A Post Comments
export const postCreateComment = async (req, res, next) => {
    try {
        const postId = req.body.postId;     
        const userId = req.body.userId;
        const commentId = req.body.commentId;  
        const newComment = new Comment ({
            comment: req.body.comment,
            user: userId,
            post: postId
        });
       const comment =  await newComment.save();
       if(commentId){
        // this will be a reply
        const  existingComment = await Comment.findById(commentId);
        existingComment.replies.push(comment._id);
        existingComment.save();
       }else{
        // this will be a new comment
           const post = await Post.findById(postId);
           post.comments.push(comment._id);
           await post.save();
       };

       res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        res.status(400).json('Bad Credentials');
    }
}









