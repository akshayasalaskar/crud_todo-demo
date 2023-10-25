const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Import dotenv to load environment variables.

const routes = require("./routes/TaskRoute");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // Use || instead of | for the default port.

app.use(express.json());
app.use(cors());

// Code for CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Code for CORS error ends

// Load environment variables from a .env file
dotenv.config();

// Code to connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Code to connect to MongoDB ends here

//Code for handling api requests
app.use("/api", routes); // Code for routing server endpoints, appending /api for all our routes

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
