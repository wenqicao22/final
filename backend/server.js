const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const app = express();
const User = require("./model/user");
const Event = require("./model/event");
const Star = require('./model/star')


//rocess.env.MONGODB_URI
mongoose.connect(
  "mongodb+srv://wenqicao:caowenqi@cluster0.mjpjr.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log('mongoDB connected.'))
.catch(err => console.log(err));;


app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser("secret"));
app.use(passport.initialize());
app.use(passport.session());
require("./passport-config")(passport);




//route
const login = require('./route/login')
app.use('/login', login)
const register = require('./route/register')
app.use('/register', register)
const starList = require("./route/starList");
app.use('/starList', starList)


app.get("/user", (req, res) => {
  console.log("user")
  console.log(req.user)
  res.send(req.user); 
});

app.get('/logout',  (req, res) => {
  req.logout()
  res.send("loged out successfully.")
})

app.delete('/deleteevent', async(req, res) => {
  const {id} = req.body
  await Event.findByIdAndDelete(id, (err) => {
    if (err) console.error(err)
  })
  res.send("Deleted.")
})

app.get('/getallevent', async(req, res) => {
  const {username} = req.user
  await Event.find({manager: username}, (err, doc) => {
    if (err) console.error(err)
    const allEvent = []
    if (doc !== null && doc.length !== 0){
      doc.forEach(element => {
        const event = {
          id: element._id,
          manager: element.manager,
          name: element.name,
          star: element.star,
          time: element.time,
          isAccepted: element.isAccepted
        }
        allEvent.push(event)
      });
    }
    res.send(allEvent)
  })
})
//get all star with a specific manager
app.get('/getallstar',  async (req, res) => {
  
  //get will send a user object in the request!!!
  const {username} = req.user
  Star.find({manager: username}, (err, doc) => {
    if (err) console.error(err)
    const allStar = []
    if (doc !== null && doc.length !== 0) {
      doc.forEach((element) => {
        const star = {
          manager: element.manager,
          name: element.name,
          age: element.age,
          gender:element.gender
        }
        allStar.push(star)
        
      })
      
      res.send(allStar)
      
    }
  } )
})

//add event for a manager
app.post('/addevent', async (req, res) => {
  const {manager} = req.body
  const {name} = req.body
  const {time} = req.body
  const {star} = req.body
  const {isAccepted} = req.body
  Event.findOne({manager: manager, name: name, time: time, star: star}, async(err, doc) => {
    if (err) console.error(err)
    if (doc) {
      res.send("The event is alrady exist.")
    }else {
      const newEvent = new Event ({
        manager: manager,
        name: name,
        time: time,
        star: star,
        isAccepted: isAccepted
      })
      await newEvent.save()
      res.send("The event added.")
    }
  })
})


const port = process.env.PORT || 4000;
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
}
app.listen(port, () => {
  console.log(`Server is on port ${port}`);
});