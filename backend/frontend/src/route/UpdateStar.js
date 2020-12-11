import React, {useContext, useEffect, useState} from 'react'
import { myContext } from './Context'
import axios from 'axios'


export default function UpdateStar() {
    const context = useContext(myContext)
    const [age, setAge] = useState()
    const [profile, setProfile] = useState()
    const [data, setData] = useState()

    useEffect(()=>{
        axios({
            method: "put",
            withCredentials: true,
            url:"http://localhost:4000/getStar",
            data:{
                name: context.username
            }
        })
        .then((res) => {
            const {message} = res.data
            if (message === "Star found.") {
                const {star} = res.data
                // console.log("star", star)
                setData(star)
            }
        })
    },[data, context])
   
    
    const updateProfile = () => {
        
        axios({
            method: "put",
            withCredentials: true,
            url: "http://localhost:4000/updateStar",
            data: {
                name: context.username,
                profile: profile
            }
        })
        .then((res) => {
            if (res.data === "Updated."){
                alert("Profile changed!")
            }
        })
        
    }

    return(
        <div className="container">
            <h3>
                Do you wanna change it your current profile? 
            </h3>
            <div className="forms">
                <ul>
                    <li>
                        <input placeholder="Enter your current age here." type="text" onChange={(e) => setAge(e.target.value)}/>
                    </li>
                    <li>
                        
                        <input placeholder="Enter your new profile here." type="text" id="large-input" onChange={(e) => setProfile(e.target.value)}/>
                    </li>
                    <li>
                        <button onClick={updateProfile}>Submit</button>
                    </li>
                </ul>
            </div>
            {data ? (
                <form>
                    <table className="tables">
                        <thead>
                            <tr>
                                <th>
                                    Age
                                </th>
                                <th>
                                    Profile
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {data.age}
                                </td>
                                <td>
                                    {data.profile}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            ) : (
                <div>
                    Your Profile Is Empty
                </div>
            )}
            
        </div>
    )
}