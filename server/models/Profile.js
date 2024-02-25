const mongoose = require("mongoose")
const Schema=mongoose.Schema;
//This model contains the profile of a User.

let profileSchema=new Schema({
    userid: String, //ID of the owner (User)
    membersince: String, //Date of registration
    header: String, //Full name of the User
    content: String, //Content of the profile
    likesgiven: Array, //Array of users (ID) who the User has liked
    likesgot: Array, //Array of users (ID) who have liked the User's profile
    matches: Array //Array of users (name and ID) who have matched with the owner
    

})
module.exports=mongoose.model("Profile", profileSchema)