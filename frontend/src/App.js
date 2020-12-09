import React, { useState } from 'react';
import './App.css';
import axios from 'axios'



function App(props) {
  const [loginUsername, setloginUsername] = useState("")
  const [loginPassword, setloginPassword] = useState("")
  const [managerStatus, setManagerStatus] = useState("")
  const [message, setMessage] = useState("")



  const login = () => {
    axios({
      method:'post',
      data: {
        username: loginUsername,
        password: loginPassword,
        managerOrStar: managerStatus
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

  // const getUser = () => {
  //   axios({
  //     method:'get',
  //     withCredentials:true,
  //     url: 'http://localhost:4000/user'
  //   })
  //   .then((res) => {
  //     console.log(res)
  //     setData(res.data)
  //     console.log(res.data)
  //   })
  // }

  return (
    <div className="App">
      <div>
        <h1>Login</h1>
        
        <input  placeholder="username" onChange={(e) => setloginUsername(e.target.value)}/>
        <input  type="password" placeholder="password" onChange={(e) => setloginPassword(e.target.value)}/>
        <input type='radio' name='userType' id='manager' value='manager' onClick={(e) => setManagerStatus(e.target.value)}/>
        <label htmlFor='manager'>Manager</label>
        <input required type='radio' name='userType' id='star' value='star' />
        <label htmlFor='star'>Star</label>
        <button onClick={login}>Submit</button>
      
      </div>
      <div>
        {message}
      </div>
      {/* <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Welcome Back {data.username}</h1> : null}
      </div> */}
    </div>
  );
}

export default App;
