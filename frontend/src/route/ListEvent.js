import React, { useContext, useEffect, useState } from 'react'
import { myContext } from './Context'
import '../App.css'
import axios from 'axios'

export default function ListEvent() {
    const context = useContext(myContext)
    const [name, setName] = useState("")
    const [time, setTime] = useState("")
    const [star, setStar] = useState("")
    const [newEventList, setNewEventList] = useState([])
    //all the star data for the manager
    const [data, setData] = useState([])
    //all the event for the manager
    const [events, setEvents] = useState([])
    
    useEffect (() => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:4000/getallstar",
            // data: {
            //     manager: context.username
            // }
        })
        .then ((res) => {
            //res.data is an array of star objects
            setData(res.data)
            
        })

        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:4000/getallevent",
            // data: {manager: context.username},
        })
        .then((res) => {
            setEvents(res.data)
        })
    },[])
    if (context.managerOrStar !== "manager") {
        return (
            <div className="non-admin">
                This page is for manager only.
            </div>
        )
    }

    const addEvent = () => {
        axios({
            method: "post",
            data: {
                manager: context.username,
                name: name,
                time: time,
                star: star,
                isAccepted: false
            },
            withCredentials:true,
            url: "http://localhost:4000/addevent"
        })
        .then((res) => {
            if (res.data === "The event added.") {
                let list = newEventList
                const newEvent = {
                    manager: context.username,
                    name: name,
                    time: time,
                    star: star,
                    isAccepted: false
                }
                list.push(newEvent)
                setNewEventList(list)
            }
            
        })
    }
   const updateStar=() =>{
       var e = document.getElementById("star")
       setStar(e.value)
   }
  


    return (
        <div className="container">
           <h1>Event List</h1>
           <div>
               <input placeholder="Name Of The Event" type="text" onChange={(e) => setName(e.target.value)}/>
               <input placeholder="MM/DD/YY" type="text" onChange={(e) => setTime(e.target.value)} />
               <select id="star" name="star" onChange={updateStar}>
                <option>Select A Star</option>
                {
                    data ? (
                        data.map((star, index) => 
                        <option value={data[index]["name"]} key={index}>
                            {data[index]["name"]}
                        </option>)
                    ) : (
                        <>
                        </>
                    )
                }
               </select>
               <input type="submit" value="Add Event" onClick={addEvent} />
            </div>
            <div className="star-list">
                {newEventList !==null && newEventList.length !== 0 ? (
                    <>
                    {newEventList.map((event, index) => 
                    <div className="star-info" key={index}>
                        Event 
                        <h3> {newEventList[index]["name"]}</h3> has been added! Name: <h3>{newEventList[index]["name"]}</h3>, Time: <h3>{newEventList[index]["time"]}</h3>. The star is <h3>{newEventList[index]["star"]}</h3>, status is <h3>{newEventList[index]["isAccepted"]}</h3>
                    </div>)}
                    </>
                ) : (
                    <div>
                        No new event added.
                    </div>
                )
                }
                <div>
                    <h3>Event So Far:</h3>
                        <table id="star-table">
                            <tbody>
                                <tr>
                                    <th>Name Of Event</th>
                                    <th>Time</th>
                                    <th>Star</th>
                                </tr>
                            {events ? (events.map((p, index) => 

                                <tr key={index} id={index}>
                                    <td>
                                        {p.name}
                                    </td>
                                    <td>
                                        {p.time}
                                    </td>
                                    <td>
                                        {p.star}
                                    </td>
                                    <td>
                                        {p.isAccepted}
                                    </td>
                                
                                </tr>
                            )) : (
                                <div>
                                    No Event For {context.username}.
                                </div>
                            )}
                            </tbody>
                        </table>
                </div>
                    
            </div>
        </div>
    )
}