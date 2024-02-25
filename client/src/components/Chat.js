import {useEffect, useState } from "react"
import MessageList from "./MessageList"
import { useParams } from "react-router-dom"
//This component shows chat and profile of a user

//Credit for chat structure: https://www.w3schools.com/howto/howto_css_chat.asp
//Credit for fetching messages periodically: https://stackoverflow.com/questions/59667278/react-hooks-periodic-run-useeffect
const Chat = () => {
    const {userid}=useParams()
    const [chat,setChat]=useState({})
    const [profile, setProfile]=useState("")
    //Fetch previous messages and userprofile
    useEffect(()=>{
        fetchMessages(userid)
        fetchProfile(userid)
        
    },[userid])
    //Function used to fetch messages
    function fetchMessages(userid){
        fetch("/api/users/chat/"+userid)
        .then((response)=> response.json())
        .then( (json) => {
            setChat(json)
            if(!json.msg){
                const id = setInterval(()=> {
                    fetchMessages(userid)
                },60000) //Fetch messages every 60 seconds
            }
    })

    }
    function fetchProfile(userid){
        fetch("/api/users/profile/"+userid)
        .then((response)=> response.json())
        .then((json) => {
            console.log(json)
            setProfile(json)
        })
    }
    
    function sendMessages(e){
        e.preventDefault()
        if (document.getElementById("textarea1").value!==""){
        fetch("/api/users/chat/"+userid,{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                content: document.getElementById("textarea1").value
            })
        })
        .then((response)=>response.json())
        .then((json)=>document.getElementById("textarea1").value==="")
        .then(fetchMessages(userid))
    
    }}

    if (chat.msg){
        return( //User has not logged in
            <div>
            <div class="row">
                <div class="col s10 m6 offset-m3 offset-s1">
                    <div class="card #f06292 pink lighten-2">
                        <div class="card-content white-text">
                        <span class="card-title">{"Login to chat with other users"}</span>
                        </div>
                </div>
                </div>
            </div>
        </div>                
    )}
    else if (!chat.chat) { //To handle for example, server restarts
        return (
            <div>
                <div class="row">
                    <div class="col s10 m4 offset-m4 offset-s1">
                        <div class="card #f06292 pink lighten-2">
                        <div class="card-content white-text">
                        <span class="card-title center">{"Something went wrong"}</span>
                        <p class="center">&pi;²&ne;g </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>)        
    } else {
    

    return(
        <div class="page">
        <div>
        <div class="row">
            <div class="col offset-s1 s10 m10 offset-m1">
                <div class="card #f8bbd0 pink lighten-4">
                    <div class="card-content black-text">
                        <span class="card-title activator ">{chat.header}</span>

                        <div class="row">
                        <MessageList receiver={userid} items={chat.chat.messages}></MessageList>
                        </div>
                        
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">mode_edit</i>
                                <textarea id="textarea1" class="materialize-textarea"></textarea>
                                <label for="textarea1" class="black-text">Message</label>
                            
                             </div>
                            <div class="col s2 offset-s9">
                            <button onClick={sendMessages} class="btn waves-effect waves-light pink">
                                    <i class="material-icons">send</i>
                                </button>
                            </div>
                             </div>
                    </div>
                   <div class="#f06292 pink lighten-2 card-reveal">
                   <span class="card-title white-text">{profile.header}<i class="material-icons right">close</i></span>
                    <p class="desc white-text">Description</p>
                    <p class="white-text">{profile.content}</p>
                    <p class="desc">Member since {profile.membersince}</p>
                   </div>
                </div>
            </div>
                
        </div>            
        </div>

        </div>
        
    )
    }
}

export default Chat