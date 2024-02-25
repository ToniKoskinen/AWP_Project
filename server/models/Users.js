const mongoose = require("mongoose")
const Schema=mongoose.Schema;
// This model contains information of the user when the user is registered
let userSchema=new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
})
module.exports=mongoose.model("Users",userSchema)