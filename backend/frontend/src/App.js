import React, { useState } from 'react';
import './App.css';
import axios from 'axios'



function App(props) {
  const [loginUsername, setloginUsername] = useState("")
  const [loginPassword, setloginPassword] = useState("")
  const [managerStatus, setManagerStatus] = useState("")
  const [message, setMessage] = useState("star")



  const login = () => {
    axios({
      method:'post',
      data: {
        username: loginUsername,
        password: loginPassword,
        // managerOrStar: managerStatus
      },
      withCredentials:true,
      url: 'http://localhost:4000/login'
    })
    .then((res) => {
      console.log("login:",res)
      setMessage(res.data.message)
      if (res.data.message === "The user login successfully."){
        console.log("login successfully")
        alert("please refresh after login")
        props.history.push('/home')
        window.location.reload(true);
      }
      //if login success, props.history.push('redirect path')
    })
  }

  return (
    <div className="container">
      <div>
        <h2>Login</h2>
        <div className="forms">
          <ul>
            <li>
              <input  placeholder="username" onChange={(e) => setloginUsername(e.target.value)}/>
            </li>
          <li>
            <input  type="password" placeholder="password" onChange={(e) => setloginPassword(e.target.value)}/>
          </li>
          <li>
            <input type='radio' name='userType' id='manager' value='manager' onClick={(e) => setManagerStatus(e.target.value)}/>
            <label htmlFor='manager'>Manager</label>
            <input required type='radio' name='userType' id='star' value='star' />
            <label htmlFor='star' >Star</label>
          </li>
          <li>
            <button onClick={login}>Submit</button>
          </li>
        </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
