const mongoose = require("mongoose");

ongoose = mongoose.connect("mongodb://127.0.0.1:27017/HabitTracker");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: Failed to connect to MongoDB"));

db.once("open", function () {
  console.log("Connected to MongoDB");
});
