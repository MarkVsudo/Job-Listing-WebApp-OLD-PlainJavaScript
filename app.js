const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const formRoutes = require("./routes/formRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Routes
app.use("/", require("./routes/routes"));
app.use("/form", formRoutes);
app.use("/forgot-password", formRoutes);

// Start your Express server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
