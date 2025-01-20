require('dotenv').config();

const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("./config/passportConfig");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));

// Session setup
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Route to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Example: Add routes for login links in the HTML file itself
app.get("/login-options", (req, res) => {
  res.send(`
    <a href='/auth/google'>Login with Google</a><br>
    <a href='/auth/facebook'>Login with Facebook</a>
  `);
});

// Include other routes
app.use(authRoutes);
app.use(profileRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
