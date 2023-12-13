const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formRoutes = require("./routes/formRoutes");
const PORT = process.env.PORT || 5000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/", require("./routes/routes"));
app.use("/form", formRoutes);

// Start your Express server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
