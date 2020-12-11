const mongoose = require("mongoose")

const star = new mongoose.Schema({
    manager: {
        type:String,
        required:true},
    name: {
        type:String,
        required:true},
    age: {
        type:String,
        required:true},
    gender: {
        type:String,
        required:true},
    profile: {
        type:String,
        default: null}
})

module.exports=mongoose.model("Star", star)