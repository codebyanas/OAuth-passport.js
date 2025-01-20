require('dotenv').config();

const express = require("express");
const session = require("express-session");
const passport = require("./config/passportConfig");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send(`
    <a href='/auth/google'>Login with Google</a><br>
    <a href='/auth/facebook'>Login with Facebook</a>
  `);
});

app.use(authRoutes);
app.use(profileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
