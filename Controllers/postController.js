import User from '../Models/user.js';
import Post from '../Models/post.js';
import Comment from '../Models/comment.js'
import {postActionTypes} from '../src/util/common/enums.js'

export const refindUser = async (id) => {

  const user = await User.findById(id).populate({
    path: 'friends',
    select: '_id firstName lastName picture location',
    })
    .exec();
    // Create a user object without the password field
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    return userWithoutPassword;
}


// Post A Post
export const createPost = async (req, res) => {
    try {
        const {post, location, images, author} = req.body
        const newPost = new Post({post, location, images, author})
        
        const savedPost = await newPost.save();
        const user = await User.findById(author);
        // If user is not found in the database
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        user.posts.push(savedPost._id);
        await user.save();
        res.status(200).json({msg: 'Post saved successfully!'});

    } catch (error) {
        console.log(error);
        res.status(500).json({
          msg: 'Internal Server Error',
          error: error
        });
    }
};

// Get A Post Feed
// export const getUserPost = async (req, res) => {
//     try {
        
//         const user = await User.findById(id)
//         .populate('friends')
//         .populate('posts')
//         .populate('likedPosts')
//         .populate('savedPosts')
//         .exec();

//         res.status(200).json(user);

//     } catch (error) {
//         console.log(error);
//         res.status(400).json('Bad Credentials');
//     }
// };
// Get A Post Feed
// This is for the deep nesting of replies
const populateReplies = async (comment) => {
    if (comment.replies.length === 0) {
      return comment;
    }
  
    const populatedReplies = await Promise.all(
      comment.replies.map(async (replyId) => {
        const reply = await Comment.findById(replyId)
        .populate({ 
            path: 'user', 
            select: '_id firstName lastName picture' 
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
        .populate('author', '_id firstName lastName picture location')
        .populate({
          path: 'comments',
          select: '_id comment user replies createdAt',
          populate: [
            {
              path: 'user',
              select: '_id firstName lastName picture location',
            },
            {
              path: 'replies',
              select: '_id comment user replies createdAt',
              populate: {
                path: 'user',
                select: '_id firstName lastName picture location',
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
        const id = req.params.id;
        const postId = req.params.postId;
        const actionType = req.params.actionType;
        const user = await User.findById(id);
        const post = await Post.findById(postId);


        if(actionType === postActionTypes.like){
          if(user.likedPosts.includes(postId)){
            user.likedPosts = user.likedPosts.filter((like) => like._id.toString() !== postId.toString());
            post.likes -= 1
          }else{
              user.likedPosts.push(postId);
              post.likes += 1
          }
        }
        if(actionType === postActionTypes.save){
          if(user.savedPosts.includes(postId)){
            user.savedPosts = user.savedPosts.filter((save) => save._id.toString() !== postId.toString());
            
          }else{
            user.savedPosts.push(postId);
          }
        }
        await user.save();
        await post.save();
        
        res.status(200).json({likes: post.likes, actionType, user: await refindUser(id)});
        
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
