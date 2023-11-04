// app.js
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const dbConnection = require("./config/db-config");
const PORT = process.env.PORT || 5000;

app.use("/", require("./routes/routes"));

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Start your Express server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
