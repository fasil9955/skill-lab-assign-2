const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const mongoose = require("mongoose");

dotenv.config();
const { URI, PORT } = process.env;
const app = express();

//connecting to mongodb database
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(()=>{
    console.log("db connected");
    })
  .catch((err)=>{
    console.log(err);
    })




// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
