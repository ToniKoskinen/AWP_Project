// The structure of this component is based on examples of Materialize


const Login = () => {
    
    function Loginfun(e){
        e.preventDefault()

        fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: document.getElementById("email").value,
                password: document.getElementById("password").value

            })
        }).then((response)=> {
            if (response.status===200){
                
                window.location.href="/"
            } else {
                document.getElementById("err").textContent="Invalid email or password"
            }
        })
    }

    
    return (
        <div class="row center">
            
            <form class="col s12 m10 offset-m1 l10 offset-l3">
                <div class="row">
                <div class="input-field col s12 l4">
                    <input type="email" id="email" name="email"/>
                    <label for="email">Email</label>
                </div>

                <div class="input-field col s12 l4">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password"/>
                </div>
                <div class="col l4"></div>
                </div>
                <div>

                    <p id="err" class="col s5 m7 l7 red-text"></p>
                    <button onClick={Loginfun} class="offset-m3 col m2 l2 s2 btn waves-effect waves-light" type="submit">Login</button>
                </div>
            </form>
                
        </div>
    )
    
}

export default Login