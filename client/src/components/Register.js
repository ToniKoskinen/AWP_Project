// The structure of this component is based on examples of Materialize: 
//https://materializecss.com/text-inputs.html


const Register = () => {

    function Registerfun(e){
        e.preventDefault()
        fetch("/api/users/register", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          first_name: document.getElementById("first_name").value,
          last_name: document.getElementById("last_name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value
        })
      }).then(response =>{ //Registration success
        if (response.status===200){
          window.location.href="/"
        }
        response.json().then(data=>{
          document.getElementById("err").textContent=data.msg})})
      
    }
    function comparePasswords(e){ //Compare passwords
      if(document.getElementById("password").value!==document.getElementById("cpassword").value &&
      document.getElementById("cpassword").value!==""){
        document.getElementById("cpwd-error").textContent="Passwords do not match"
      } else {
        document.getElementById("cpwd-error").textContent=""
        
      }
    }
    function checkRequiredFields(e){ //If all fields are filled --> activate the button
      comparePasswords()
      if(document.getElementById("first_name").value!=="" &&
        document.getElementById("last_name").value!=="" &&
        document.getElementById("email").value!=="" &&
        document.getElementById("password").value!=="" &&
        document.getElementById("cpassword").value!=="" &&
        document.getElementById("cpwd-error").textContent==="" //No activation if passwords do not match
       ){
        document.getElementById("registration").disabled=false
      } else {
        document.getElementById("registration").disabled=true
      }
     }      
    
    return (
        <div class="row">
            <div class="col s1"></div>
        <form class="col s12 m12">
          <div class="row">
            <div class="input-field col s12 l4 offset-l2">
              <input id="first_name" type="text" onChange={checkRequiredFields}/>
              <label for="first_name">First Name</label>
            </div>
            <div class="input-field col s12 l4">
              <input id="last_name" type="text" onChange={checkRequiredFields}/>
              <label for="last_name">Last Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12 l4 offset-l2">
              <input id="email" type="email" onChange={checkRequiredFields}/>
              <label for="email">Email</label>
            </div>
            <div class="col s6">
              <p id="err" class="red-text"></p>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12 l4 offset-l2">
              <input id="password" type="password" onChange={checkRequiredFields}/>
              <label for="password">Password</label>
            </div>
            <div class="input-field col s12 l4">
              <input id="cpassword" type="password" onChange={checkRequiredFields}/>
              <label for="cpassword">Retype Password</label>
              <p class="red-text" id="cpwd-error"></p>             
            </div>
          </div>
          <div class="row">
          <p class="col s8 l9 grey-text right-align">All fields are required for registration</p>
          <button id="registration" onClick={Registerfun} class="col s3 m3 l2 btn waves-effect waves-light" type="submit">Registration</button>
          </div>

        </form>
            <div class="col s1"></div>
      </div>
    )
}

export default Register