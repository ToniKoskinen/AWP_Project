import { useEffect } from "react";

const Logout = () => {
    useEffect(() => {
        fetch("/api/users/logout",{
            method: "POST"
        })
    })
    return(
    <div class="row">
        <div>
            <h3 class="center desc">You have logged out</h3>
        </div>

    </div>)
}

export default Logout;