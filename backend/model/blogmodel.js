
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "title required"],
      unique: true,
    },
    author: {
      type: String,
      required: [true, "author required"],
    },
    content: {
      type: String,
      required: [true, "genre required"],
    },
    
   
  });


  module.exports = mongoose.model("blogs", blogSchema);