import express from 'express';
import * as AuthController from '../Controllers/auth.js'
import * as UserController from '../Controllers/userController.js'
import * as PostController from '../Controllers/postController.js'
import {verifyToken} from '../Middleware/auth.js'

const router = express.Router();

router.post("/auth/login", AuthController.getLogIn);

// Get User
router.get('/user/:id', UserController.getUser);

// Add Or Remove a Friend
router.patch('/user/:id/:friendId', UserController.postAddRemoveFriend);

// Posts
router.post('/post', PostController.createPost);
router.get('/post/:userId', PostController.getUserPost);
router.get('/postFeed/:userId', PostController.getFeedPost);
router.get('/post/:id/:postId/:actionType', PostController.likeSavePost);

// Comments
router.post('/post/comment', PostController.postCreateComment)

export default router;