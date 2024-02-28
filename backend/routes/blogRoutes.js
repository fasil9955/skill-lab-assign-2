const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

 // Router-level authentication middleware

router.get('/',authMiddleware.authenticate, blogController.getAllBlogs);
router.post('/',authMiddleware.authenticate,  blogController.createBlog);
router.get('/search',authMiddleware.authenticate,blogController.search);

router.get('/:id',authMiddleware.authenticate,blogController.getBlogById);

router.put('/:id',authMiddleware.authenticate,  blogController.updateBlog);
router.delete('/:id',authMiddleware.authenticate,  blogController.deleteBlog);
module.exports = router;
