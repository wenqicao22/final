import React, { useContext, useEffect, useState } from 'react'
import { myContext } from './Context'
import axios from 'axios'
import '../App.css'


export default function StarList() {
    const context = useContext(myContext)
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [list, setList] = useState([])
    const [userList, setUserList] = useState([])
    const [data, setData] = useState([])
    
    useEffect (() => {
        
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:4000/starList",
            // data: {
            //     manager:context.username
            // }
        })
        .then ((res) => {
            const filteredData = []
            res.data.forEach(element => {
                if (element.manager === context.username) {
                    filteredData.push(element)
                }
            });
            setData(filteredData)
            
        })
    },[data, context])
    if (context.managerOrStar !== "manager") {
        return (
            <div className="non-admin">
                This page is for manager only.
            </div>
        )
    }

    const addStar = () => {
        axios({
            method: "put",
            data: {
                manager: context.username,
                name: name,
                age: age,
                gender: gender
            },
            
            withCredentials:true,
            url: "http://localhost:4000/starList"
        })
        .then((res) => {
            const {message} = res.data
            const info = message["info"]
            // console.log("info:",info)
            // console.log("message:",message)
            if (info === "Star added"){
                var newList = list
                var newUserList = userList
                newList.push({
                    name,
                    age,
                    gender
                })
                const username = message["username"]
                const password = message["password"]
                var user = {username: username,
                            password: password}
                newUserList.push(user)
                setList(newList)
                setUserList(newUserList)
            }
        })
    }
   const updateGender=() =>{
       var e = document.getElementById("gender")
       setGender(e.value)
   }



    return (
        <div className="container">
           <h2>Star List</h2>
           <div className='forms'>
                <ul>
                    <li>
                        <input placeholder="name" type="text" onChange={(e) => setName(e.target.value)} />
                    </li>
                    <li>
                        <input placeholder="age" type="text" onChange={(e) => setAge(e.target.value)} />
                    </li>
                    <li>
                        <select id="gender" name="gender" onChange={updateGender}>
                            <option value="selectGender">Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                    </li>
                    <li>
                        <input type="submit" value="Add Star" onClick={addStar} />
                    </li>
                    <li>
                        {list !==null && list.length !== 0 ? (
                            <>
                            {list.map((star, index) => 
                            <div className="star-info" key={index}>
                                star 
                                <h3> {list[index]["name"]}</h3> has been added! Age: <h3>{list[index]["age"]}</h3>, Gender: <h3>{list[index]["gender"]}</h3>. The username is <h3>{userList[index]["username"]}</h3>, password is <h3>{userList[index]["password"]}</h3>
                            </div>)}
                            </>
                        ) : (
                            <div>
                                No new star added
                            </div>
                        )
                        }
                    </li>
               </ul>
            </div>
            <div className="star-list">
                <div>
                    <h3>Star So Far:</h3>
                        <table id="star-table" className="tables">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.map((p, index) => 

                                <tr key={index} id={index}>
                                    <td>
                                        {p.name}
                                    </td>
                                    <td>
                                        {p.age}
                                    </td>
                                    <td>
                                        {p.gender}
                                    </td>
                                
                                </tr>
                            )}
                            </tbody>
                        </table>
                </div>
                    
            </div>
        </div>
    )
}