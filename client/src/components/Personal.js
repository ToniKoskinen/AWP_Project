//This component is for creating and editing own profile
import {useEffect, useState} from "react"
import Profile from "./Profile.js"
const Personal = () => {
    const [userdata,setUserData]=useState("")
    const [disabled,setDisabled]=useState(true)
    const [content,setContent]=useState("")
    //Fetch userdata
    useEffect(()=>{
        fetch("/api/users/userinfo")
        .then((response)=>response.json())
        .then((json) =>{
            setUserData(json)
            if (json.content){
                setContent(json.content)
            }
        })},[])
    function editProfile(e){
        e.preventDefault()
            fetch("/api/users/editprofile",{
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(
                    {content: document.getElementById("textarea1").value}
                    )
                   
            })
            .then((response)=>{if(response.status===200){
                userdata.content=document.getElementById("textarea1").value
                setContent(userdata.content)
            }}

            )

    }
    function checkRequiredField(e){
        e.preventDefault()
        if (document.getElementById("textarea1").value!==""){
            setDisabled(false)
          } else {
            setDisabled(true)
          }
    }
    
    if(userdata.header){
    
    return(

    <div>
        <nav class="valign-wrapper pink">
            
            <h4 class="desc">My profile</h4>
        </nav>
        
   
        <div class="row">
            <div class="col s10 offset-s1 l4 offset-l4">
                <Profile header={userdata.header} content={content} ></Profile>
            </div>
            <div class="col s12 l4 ">
                <p class="desc">Member since {userdata.membersince}</p>
            </div>
        </div>
        <div class="row">
        <div class="input-field col s12 l4 offset-l4">
            <textarea id="textarea1" class="materialize-textarea" onChange={checkRequiredField}></textarea>
            <label for="textarea1">Change description</label>
            <div class="offset-s7 offset-l7 col s5 l7">
                    <button onClick={editProfile} disabled={disabled} id="edit" class="editbutton btn waves-effect waves-light pink">Save changes
                        <i class="material-icons right">edit</i>
                    </button>
                </div>                            
        </div>
        </div>
        


        
            
    </div>
    )
    } else {
        return (
        <div class="row">

        </div>)
    }
}

export default Personal