const mongoose = require("mongoose")

const user = new mongoose.Schema({
    username: {type: String,
            unique: true,
            required: true},
    password: String,
    managerOrStar: String
})

module.exports=mongoose.model("User", user)