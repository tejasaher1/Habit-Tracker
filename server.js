const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("./Config/mongoose");

require("dotenv").config(); // Load environment variables from .env file


//Adding EJS engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Assets folder for CSS, Images and JavaScript files
app.use(express.static(path.join(__dirname, "/Assets")));
app.use(express.urlencoded());

//Main Route 
const EnteryRouter = require("./Routers/EnteryRouter");
app.use("/", EnteryRouter);


app.listen(port, function (error) {
  if (error) {
    console.log("Error starting server:", error);
  }

  console.log(`Server started on port- ${port}`);
});
