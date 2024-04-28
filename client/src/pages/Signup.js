import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    
  const history=useNavigate()
  const [email, setEmail]=useState('')
  const [password,setPassword]=useState('')


  async function submit(e){
    e.preventDefault();

    try{

      await axios.post('http://localhost:8000/api/user/signup',{
        email,password
      })
      .then(res=>{
        if(res.data=="exist"){
          alert("User already exists")
        }
        else if(res.data=="not"){
          history("/home")
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
      <h1>Signup</h1>

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

      <Link to="/">Login</Link>
    </div>
  );
}

export default Signup;
