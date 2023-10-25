const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email Id"],
    unique: true,
    validate: [isEmail, "Please Enter a Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minlength: [6, "Minimum password length is 6"],
  },
});

const User = mongoose.model("user", userSchema);

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = {User, Task };


// this code sets up a Mongoose schema for a "Task" entity with one field called "task," which represents a task description. 
//It also exports a Mongoose model named "Task" based on this schema, allowing you to work with "Task" documents in your MongoDB 
//database using the Mongoose API.