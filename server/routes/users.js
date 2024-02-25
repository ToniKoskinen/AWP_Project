var express = require('express');
const {body, validationResult}=require("express-validator")
var router = express.Router();
var bcrypt=require("bcryptjs")
var session=require("express-session")
var passport=require("passport")

router.use(express.urlencoded({extended: false}))
router.use(express.json())


//DB-stuff
const Users=require("../models/Users")
const Profiles=require("../models/Profile")
const Chats=require("../models/Chats")
const Messages=require("../models/Message")

async function findUser(email){
  return await Users.findOne({email: email})
}
async function findUserByID(id){
  try {return await Users.findById(id)}
  catch(e){
    return undefined
  }
}
async function findProfileByUserID(id){
  return await Profiles.findOne({userid: id})
}
async function findProfileByID(id){
  return await Profiles.findById(id)
}

async function findAllProfilesExceptOne(id){
  return await Profiles.find({userid: { $nin: id}})
}

async function findChatByUserIDs(ids){
  return await Chats.findOne({users: ids})
}
//Passport-stuff
const initializePassport=require("../passport-config");
initializePassport(passport,findUser,findUserByID)
router.use(session({
  secret: "ASFSDF#45jk242Spi2gDf3242sdf",
  resave: false,
  saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())

//Authentication-stuff
function checkAuthenticated(req,res,next){
  if (req.isAuthenticated()){
      return next()
  }
  return res.json({msg: "Unauthorized"})
}
function checkNotAuthenticated(req,res,next){
  if (req.isAuthenticated()){
      return res.redirect("/")
  }
  return next()
}

//This method posts like to a user's profile
router.post("/like/:id", checkAuthenticated, (req,res)=>{
    findProfileByID(req.params.id).then((profile) => {
      
      let likesgot=profile.likesgot
      

      req.user.then(async(user)=> {
        //Profile of the user who gave the like
        const userprofile=await findProfileByUserID(user._id)
        let likesgiven=userprofile.likesgiven
        likesgiven.push(profile.userid)
        //Add like to lists bot given and got
        await Profiles.updateOne({userid: user._id},{likesgiven: likesgiven})
        likesgot.push(user._id)
        await Profiles.updateOne({userid: profile.userid},{likesgot: likesgot})
        //Check if it is a match
        if(profile.likesgiven.find((element)=>element==user._id)){
          //Update matches lists
          let matchesUser=userprofile.matches
          let matchesOtherUser=profile.matches
          //Add to matches if they aren't already
          if(!matchesUser.find((element)=>element.id==profile.userid)){
            matchesUser.push( {name: profile.header, id: profile.userid})
            matchesOtherUser.push({name: userprofile.header, id: user._id.toString()})
            await Profiles.updateOne({userid: user._id},{matches: matchesUser})
            await Profiles.updateOne({userid: profile.userid},{matches: matchesOtherUser})
          }

          return res.status(200).json({msg: "match"})
        } else {
          return res.status(200).json({msg: "liked"})
        }
      })
    })
})
//This method returns all profiles except the one who is calling it
router.get("/all", checkAuthenticated,(req,res)=> {
  req.user.then(async(user)=>{
    const profiles=await findAllProfilesExceptOne(user._id)
    
    res.status(200).json(profiles)
  })
  
  return
})
//This method returns a profile with specific userid
router.get("/profile/:userid", checkAuthenticated, async(req,res)=>{
  const profile=await findProfileByUserID(req.params.userid)
  return res.json(profile)
})
//This method returns a profile of a user who is calling it
router.get("/userinfo", checkAuthenticated, (req,res)=>{
  req.user.then(async(user)=>{
    const profile=await findProfileByUserID(user._id)
    return res.json(
      profile
    )
  })  
})
//This method allows user to edit his/her profile description
router.post("/editprofile",checkAuthenticated, (req,res)=>{
  req.user.then(async(user)=>{
    const profile=await Profiles.updateOne({userid: user._id},{content: req.body.content})
    res.json({
      name: profile.header,
      membersince: profile.membersince,
      content: profile.content
    })

    
  })
})
//This method allows user to register into the web page
router.post("/register", checkNotAuthenticated,
    body("email").isEmail(), //Check if email is valid
    body("password").isStrongPassword({ // Check if password is strong enough
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        
    }),
    async(req,res) => {
    const errors=validationResult(req).array()
    if (errors.length>0){
        if (errors[0].path=="email"){
          res.status(400).json({msg: "Invalid email."})
          return
        } else {
          res.status(400).json({msg: "Password is not strong enough."})
          return
        }
    }//Check if email is already in use
    if(await findUser(req.body.email)){
        res.status(409).json({msg: "Email already in use."})
        return
    } else {
    //Timestamp
    const time=new Date()
    const timestamp=time.getDate().toString()+"."+(time.getMonth()+1).toString()+
    "."+time.getFullYear().toString()
    //Add new user and user profile to databases  
    Users.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password,10)
    }).then((user)=>{
      Profiles.create({
        userid: user._id,
        header: user.first_name+" "+user.last_name,
        membersince: timestamp,
        content: "Hello, I'm using Koskinen's Tinder", //Initial profile text
        likesgiven: [],
        likesgot: [],
        matches: [],

      })
    })
    
    res.status(200).json({status: "ok"})
    return
    }
})

//This method allows a user to login to webpage
router.post("/login",checkNotAuthenticated,
  passport.authenticate("local"), function(req,res){
    
    return res.sendStatus(200)
  })
//    -//- to logout from webpage
router.post("/logout",checkAuthenticated, (req,res,next)=> {
  req.logout(function(err){
    if(err){return next(err)}
    res.redirect("/")
  })
  
})
//This method returns messages from a specific chat
router.get("/chat/:userid", checkAuthenticated, (req,res)=>{
  req.user.then(async(user)=>{

    //Find the chat using user ids
    var ids=[req.params.userid,user._id.toString()]
    
    ids.sort()
    const chat=await findChatByUserIDs(ids)
    
    const oUser=await findUserByID(req.params.userid) //To get name of the other user
    if (!oUser){ //User doesn't exist
      return res.sendStatus(404)
    }
 
    //Check that users have match
    const userprofile=await findProfileByUserID(user._id)
    
    if(!userprofile.matches.find((element)=>element.id==oUser._id)){
      return res.sendStatus(401)
    }
    
    if (!chat){//Chat doesn't exist --> create one
      Chats.create({
        users: ids,
        messages: []
      }).then((chat)=> 
      res.json({
        header: oUser.first_name+" "+oUser.last_name,
        chat: chat}))
      return
      
      } else {//Chat exists
        return res.json({
        header: oUser.first_name+" "+oUser.last_name,
        chat: chat})}

      })
})
//Post message to an existing chat
router.post("/chat/:userid",checkAuthenticated, (req,res)=>{
  req.user.then(async(user)=>{
    var ids=[req.params.userid,user._id.toString()]
    
    ids.sort()
    const chat=await findChatByUserIDs(ids)
    const time=new Date()
    const timestamp=time.getDate().toString()+"."+(time.getMonth()+1).toString()+
    "."+time.getFullYear().toString()+" "+time.getHours().toString()+":"+time.getMinutes().toString()
    Messages.create({
      user: user._id,
      content: req.body.content,
      lastedited: timestamp
    }).then(async (message)=>{
      var messages=chat.messages
      messages.push(message)
      await Chats.updateOne({users: ids},{messages: messages})
      res.status(200).json({msg: "Posted"})
    })

  })

})
module.exports = router;
