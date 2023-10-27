const router = require('express').Router();
const Post = require('../models/postModel.js');
const authenticateToken = require("../middleware/authenticateToken"); 

router.get('/get', authenticateToken, async (req, res) => {
    console.log("fetching posts...")
    try { 
        const user_id = req.user.id;
        console.log("fetching posts for user id", user_id)
        const posts = await Post.fetchPosts(user_id);
        res.status(200).json(posts);
    } catch(err) {
        console.log("error fetching posts: ", err)
        res.status(500).json(err);
    }
});


router.post('/create', authenticateToken, async (req, res) => {
    console.log("creating a new post...");
    try {
        const user_id = req.user.id;
        const content  = req.body.content;
        const newPost = await Post.createPost(user_id, content);
        res.status(201).json(newPost);
    } catch(err) {
        console.log("Error creating a new post: ",err)
        res.status(500).json(err);
    }
});


router.delete('/delete', authenticateToken, async (req, res) => {
    console.log("deleting a post...")
    try {
        const { post_id } = req.body;
        const deletedPost = await Post.deletePost(post_id);
        res.status(200).json(deletedPost);
    } catch(err) {
        console.log("Error deleting a post: ",err)
        res.status(500).json(err);
    }
});


module.exports = router;