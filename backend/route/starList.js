const express = require('express')
const router = express.Router()
const Star = require('../model/star')
const passport = require('passport')
const passportLocal = require("passport-local").Strategy;
// const User = require('../model/user')
const bcrypt = require("bcryptjs");
const user = require('../model/user');
require("../passport-config")(passport);
const uniqid = require("uniqid");



router.get("/", (req, res) => {
  
  Star.find({}, (err, doc) => {
    if (err) console.error(err)
    if (doc) {
      res.send(doc)
    }else {
      res.send("No star for the manager.")
    }
  })
})

router.put("/", (req, res) => {
    
    Star.findOne({ name: req.body.name }, async (err, doc) => {
        if (err) console.log(err);
        if (doc) res.send({
            message: "Star Already Exists",
            star: null
        });
        if (!doc) {
          const newStar = new Star({
            manager: req.body.manager,
            name: req.body.name,
            age: parseInt(req.body.age),
            gender: req.body.gender
          });
          await newStar.save();

          var {name} = req.body
          var username= name+ String(uniqid())
          const password = String(uniqid())
          const hashedPassword = await bcrypt.hash(password, 10)
          const newUser = new user({
              username:username,
              password: hashedPassword,
              managerOrStar: "star"
          })
          await newUser.save()
          
          res.send({
            message: {
              info: "Star added",
              username: username,
              password: password
            }
          })
        }
      });
  });

  module.exports = router;