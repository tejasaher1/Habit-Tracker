const mongoose = require("mongoose");

// mongoose = mongoose.connect("mongodb://127.0.0.1:27017/HabitTracker");

require('dotenv').config();     // Load environment variables from .env file


const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: Failed to connect to MongoDB"));

db.once("open", function () {
  console.log("Connected to MongoDB");
});
