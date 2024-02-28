const Blog = require("../model/blogmodel");
const getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching blogs' });
  }
};

const createBlog =async (req, res,next) => {
  try {
    const {title,author,content } = req.body;
    const existingUser = await Blog.findOne({ title });
    if (existingUser) {
      return res.json({ message: "Blog already exists" });
    }
    
    const blog = await Blog.create({ title,author,content });
    res
      .status(201)
      .json({ message: "Blog added succesfully", success: true,blog});
    next();
  } catch (error) {
    console.error(error);
  }
};

const getBlogById = async(req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog by ID" });
  }
};

const updateBlog = async(req, res) => {
  try {
    const blogId = req.params.id;
    const updatedBook = req.body;
    const result = await Blog.findByIdAndUpdate(blogId, updatedBook, {
      new: true,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error: error.message });
  }
};

const deleteBlog = async(req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const search =async (req, res) => {
  const searchQuery = req.body.search; // Assuming the search query is provided in the "search" field of the JSON body
  try {
    const regex = new RegExp(searchQuery, 'i');
    const suggestions = await Blog.find({ title: { $regex: regex } }).exec();
    res.json({ suggestions });
  } catch (err) {
      console.error('Error retrieving search suggestions', err);
      res.status(500).json({ error: 'An error occurred while retrieving search suggestions' });
  }
};



module.exports = { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog,search };


