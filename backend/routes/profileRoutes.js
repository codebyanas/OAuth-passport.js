require('dotenv').config();
const express = require("express");

const router = express.Router();

router.get("/profile", (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  res.send(`Welcome ${req.user.displayName}`);
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
