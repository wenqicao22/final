const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportLocal = require("passport-local").Strategy;
const User = require('../model/user')
const bcrypt = require("bcryptjs");
require("../passport-config")(passport);


router.get("/", (req, res) => {
  console.log("get")
})

router.post("/", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) console.log(err);
        if (doc) res.send("User Already Exists");
        if (!doc) {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
          const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            managerOrStar: "manager"
          });
          await newUser.save();
          res.send("User Created");
        }
      });
  });

  module.exports = router;