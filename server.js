const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("./Config/mongoose");

app.set("view engine", "ejs");
app.set("Views", path.join(__dirname, "Views"));

app.use(express.static(path.join(__dirname, "/Assets")));
app.use(express.urlencoded());

const EnteryRouter = require("./Routers/EnteryRouter");
app.use("/", EnteryRouter);

require("dotenv").config(); // Load environment variables from .env file

app.listen(port, function (error) {
  if (error) {
    console.log("Error starting server:", error);
  }

  console.log(`Server started on port- ${port}`);
});
