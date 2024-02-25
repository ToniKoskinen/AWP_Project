const mongoose=require("mongoose");
const Schema=mongoose.Schema;

let messageSchema=new Schema({
    user: String, //User who has written the message
    content: String,
    lastedited: String //Timestamp
})
module.exports=mongoose.model("Message",messageSchema);