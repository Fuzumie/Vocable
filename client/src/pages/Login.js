import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  
  const history=useNavigate()
  
  const [email, setEmail]=useState('')
  const [password,setPassword]=useState('')


  async function submit(e){
    e.preventDefault();

    try{

      await axios.post('http://localhost:8000/api/user/login',{
        email,password
      })
      .then(res=>{
        if(res.data=="exist"){
          history("/home")
        }
        else if(res.data=="not"){
          alert("User does not exist")
        }
      })
      .catch(e=>{
        alert("wrong dedtails")
        console.loge(e)
      })

    }
    catch(e){
        console.log(e)
    }

  }
  
  
  
  return (
    <div className="login">
      <h1>Login</h1>

      <form action="POST">
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          name=""
          id=""
        ></input>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          name=""
          id=""
        ></input>
        <input type="submit" onClick={submit}/>
      </form>

      <br />
      <p>OR</p>
      <br />

      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Login;
