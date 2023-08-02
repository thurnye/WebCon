import express from 'express';
import * as AuthController from '../Controllers/auth.js'
import * as UserController from '../Controllers/userController.js'
import * as PostController from '../Controllers/postController.js'
import {verifyToken} from '../Middleware/auth.js'

const router = express.Router();

router.post("/auth/login", AuthController.getLogIn);

// Get User
router.get('/user/:id', verifyToken, UserController.getUser);

// Add Or Remove a Friend
router.patch('/user/:id/:friendId', verifyToken, UserController.postAddRemoveFriend);

// Posts
router.post('user/post', PostController.createPost);
router.get('user/post/:postId', PostController.getFeedPost);
router.get('user/post/:postId/:actionType', PostController.likeSavePost);

export default router;