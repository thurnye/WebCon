import express from 'express';
import * as AuthController from '../Controllers/auth.js'
import * as UserController from '../Controllers/userController.js'
import * as PostController from '../Controllers/postController.js'
import {verifyToken} from '../Middleware/auth.js'

const router = express.Router();

//login
router.post("/auth/login", AuthController.getLogIn);

// Get User
router.get('/user/:id', verifyToken, UserController.getUser);

// Get User Friends
router.get('/friends/:id', verifyToken, UserController.getUserFriends);

// Add Or Remove a Friend
router.patch('/user/:id/:friendId', verifyToken, UserController.postAddRemoveFriend);

// Posts
router.post('/post', verifyToken, PostController.createPost);


// router.get('/post/:userId', verifyToken, PostController.getUserPost);

//get the news feeds
router.get('/postFeed/:userId', verifyToken, PostController.getFeedPost);

//add or remove likes from post
router.get('/post/:id/:postId/:actionType', verifyToken, PostController.likeSavePost);

// Add Comments
router.post('/post/comment', PostController.postCreateComment);

//like or unlike comment
router.get('/comment/:id/:commentId', verifyToken, PostController.likeComment);

export default router;