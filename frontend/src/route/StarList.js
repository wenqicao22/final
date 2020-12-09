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
            console.log(filteredData)
        })
    },[])
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
            console.log("info:",info)
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
           <h1>StarList</h1>
           <div>
               <input placeholder="name" type="text" onChange={(e) => setName(e.target.value)} />
               <input placeholder="age" type="text" onChange={(e) => setAge(e.target.value)} />
               <select id="gender" name="gender" onChange={updateGender}>
                <option value="selectGender">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
               </select>
               <input type="submit" value="Add Star" onClick={addStar} />
            </div>
            <div className="star-list">
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
                <div>
                    <h3>Star So Far:</h3>
                        <table id="star-table">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                </tr>
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