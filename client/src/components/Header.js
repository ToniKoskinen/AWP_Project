import {useEffect, useState} from "react"
import M from "materialize-css"
import Matches from "./Matches.js"
//Credit navbar-structure: https://materializecss.com/navbar.html
//Contents of the header are based on if user is logged in or not
const Header = () => {
    const [userdata,setUserData]=useState("")
    //Fetch userdata
    useEffect(()=>{

        fetch("/api/users/userinfo")
        .then((response)=>response.json())
        .then((json) =>{
            
            setUserData(json)
        })},[])

    if (userdata.msg){ // User hasn't log in --> show options to register/login in the header
        return(
            <div class="row">
            <nav class="nav-extended">   
                <div class="nav-wrapper pink">
                    <a href="/" class="brand-logo center">Koskinen's Tinder</a>
                <ul class="left hide-on-med-and-down">
                    <li><a href="/register">Register</a></li>
                    <li><a href="/login">Login</a></li>                    
                </ul>
                </div>
                <div class="nav-content pink lighten-1 hide-on-large-only">
                    <ul class="tabs tabs-transparent">
                        <li class="tab"><a href="/register">Register</a></li>
                        <li class="tab"><a href="/login">Login</a></li>
                     </ul>
                </div>
            </nav>


            
            </div>
        )

    } 
    if (userdata){ // User has logged in --> show options to logout, browse and see own profile
    return(
        <div class="row">
        
        <nav class="nav-extended">   
            <div class="nav-wrapper pink">
            <a href="/" class="brand-logo center">Koskinen's Tinder</a>
            <ul id="nav-mobile" class="left hide-on-med-and-down">
                <li><a href="/">{userdata.header}</a></li>
                <li><a href="/browse">Browse</a></li>

            </ul>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a href="/logout">Logout</a></li>
            </ul>
            </div>
            <div class="nav-content pink lighten-1 hide-on-large-only">
                <ul class="tabs tabs-transparent">
                    <li class="tab"><a href="/">{userdata.header}</a></li>
                    <li class="tab"><a href="/browse">Browse</a></li>
                    <li class="tab"><a href="/logout">Logout</a></li>
                </ul>
            </div>
            <div class="nav-content">
                <Matches matches={userdata.matches}></Matches>
            </div>
     
        </nav>

        
        
        
        </div>
       
    )}
}

export default Header