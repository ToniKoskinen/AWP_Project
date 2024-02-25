import Profile from "./Profile"
//This component is for browsing user profiles, a user can like or dislike the profile

import {useEffect, useState} from "react"
import M from "materialize-css"

const BrowseUsers= () => {
    
    
    const [profiles, setProfiles]=useState([])
    const [count, setCount]=useState(0)
    useEffect(()=>{
        //Fetch all profiles
        fetch("/api/users/all")
        .then((response)=> response.json())
        .then(json=> {
            if (json.msg){
                setProfiles(json)
            } else {
            
            setProfiles(json)
            }
        })

        
    },[count])



    function replayAction(){
        setCount(0)
        document.getElementById("like").disabled=false
        document.getElementById("dislike").disabled=false
        //Enabling or disabling replaybutton had to be done using className to work as wanted
        //No idea why
        document.getElementById("replay").className="disabled btn waves-effect waves-light blue"  
    }



    function dislikeAction(){
        var dislikeHTML='<i class="material-icons center">favorite_border</i>'
        M.toast({html: dislikeHTML})
        //Skip a user profile and move on to next
        if (count+1===profiles.length){
            //User has seen all profiles --> disable buttons
            document.getElementById("like").disabled=true
            document.getElementById("dislike").disabled=true
            document.getElementById("replay").className="btn waves-effect waves-light blue"
        } else{
            setCount(count+1)
        }
        
    }

    function likeAction(){
        var likeHTML='<i class="material-icons center">favorite</i>'
        M.toast({html: likeHTML})
        //Post like to a profile and move on to next
        fetch("/api/users/like/"+profiles[count]._id, {
            method: "POST"
        }).then((response)=>response.json())
        .then(json=>{
            
            if (json.msg==="match"){
                
                M.toast({html: "<span>It is a match with "+profiles[count].header+"!</span><a href='/profile/"+profiles[count].userid+"' class='btn-flat toast-action'>Chat</a>"})
                
            }
        })

        if (count+1===profiles.length){
            //User has seen all profiles --> disable buttons
            document.getElementById("like").disabled=true
            document.getElementById("dislike").disabled=true
            document.getElementById("replay").className="btn waves-effect waves-light blue"
        } else {
            setCount(count+1)
        }
    }

    
    if (profiles.length===0){
        return ( //User has not logged in
            <div>
                <div class="row">
                    <div class="col s10 m4 offset-m4 offset-s1">
                        <div class="card #f06292 pink lighten-2">
                            <div class="card-content white-text">
                            <span class="card-title">{"Login to see other users"}</span>
                            </div>
                    </div>
                    </div>
                </div>
            </div>

    )}
    else if (!profiles[count]){ //To handle cookie-error or something
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
    }
    
    return (
        <div>
            
            <div class="row">
                <div class="col s12 m8 l4 offset-m2 offset-l4"><Profile header={profiles[count].header} content={profiles[count].content}></Profile></div>
            </div>
            <div class="row">
                <div class="col s5 l2 center offset-s1 offset-l4">
                    <button onClick={dislikeAction} id="dislike" class="dislikebutton btn waves-effect waves-light black">Dislike
                        <i class="material-icons right">favorite_border</i>
                    </button>
                </div>
            <div class="col s5 l2 center">
            <button onClick={likeAction} id="like" class="likebutton btn waves-effect waves-light pink">Like
                <i class="material-icons right">favorite</i>
            </button>
            </div>  
            </div>
            
            <div class="row">
                <div class="col s4 l2 center offset-s4 offset-l5">
                    <button onClick={replayAction} id="replay" class="disabled btn waves-effect waves-light blue">Replay
                        <i class="material-icons right">replay</i>
                    </button>  
                </div>
            </div>
        </div>
    )
}

export default BrowseUsers