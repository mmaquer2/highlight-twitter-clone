const router = require('express').Router();
const Post = require('../models/postModel.js');


/*
* @route GET /api/posts
*/
router.get('/posts', async (req, res) => {
    try {
        const user_id = req.user.id;
        const posts = await Post.fetchPosts(user_id);
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json(err);
    }



});

module.exports = router;