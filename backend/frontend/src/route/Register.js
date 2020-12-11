import React, { useState } from 'react';
import axios from 'axios'
import '../App.css';

function Register(props) {
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setregisterPassword] = useState("")


  const register = () => {
    axios({
      method:'post',
      data: {
        username: registerUsername,
        password: registerPassword,
        managerOrStar: "manager"
      },
      withCredentials:true,
      url: 'http://localhost:4000/register'
    })
    .then((res) => {
      console.log(res)
      if (res.data === "User Created"){
        props.history.push('/')
      }
    })
  }


  return (
    <div className="container">
      <div>
        <h2>Register For Manager</h2>
        <div className="forms">
          <ul>
            <li>
              <input required placeholder="username" onChange={(e) => setRegisterUsername(e.target.value)}/>
            </li>
            <li>
              <input required type="password" placeholder="password" onChange={(e) => setregisterPassword(e.target.value)}/>
            </li>
            <li>
              <button onClick={register}>Submit</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Register;
