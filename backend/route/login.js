const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportLocal = require("passport-local").Strategy;
const User = require('../model/user')
const session = require("express-session");
require("../passport-config")(passport);


//see the authenticate document for the custom callback format
router.post("/", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) console.error(err)
      if (!user) {
          res.send({
            message: "The user/password is invalid.",
            user: null});
      } else {
        req.logIn(user, (err) => {
          if (err) console.error(err);
          res.send({
            message: "The user login successfully.",
            user: user});
            
          console.log(req.user);
        });
      }
    })(req, res, next);
  });

  module.exports = router;