//This is model for a chat between two users
const mongoose=require("mongoose")
const Schema=mongoose.Schema;

let chatSchema=new Schema({
    users: Array, //Id's of the users included in the chat
    messages: Array 
})
module.exports=mongoose.model("Chats",chatSchema)