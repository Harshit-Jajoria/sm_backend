import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.js';

const router = express.Router();

// Read

router.get('/', verifyToken, getFeedPosts); // this is for getting all post from all the users
router.get('/:userId/posts', verifyToken, getUserPosts); // getting only user post

//Update

router.patch('/:id/like', verifyToken, likePost);

export default router;
