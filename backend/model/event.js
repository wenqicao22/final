const mongoose = require("mongoose")

const event = new mongoose.Schema({
    manager: {
        type:String,
        required:true},
    name: {
        type:String,
        required:true},
    time: {
        type:String,
        required:true},
    star: {
        type:String,
        required:true},
    isAccepted: {
        type: Boolean,
        required:true}
})

module.exports=mongoose.model("Event", event)