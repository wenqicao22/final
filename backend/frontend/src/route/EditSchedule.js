import React , {useContext, useEffect, useState} from 'react'
import { myContext } from './Context'
import {useHistory} from 'react-router-dom'
import axios from 'axios'



export default function EditSchedule() {
    const context = useContext(myContext)
    // the name of event wanted to search
    const [eventName, setEventName] = useState("")
    // a list of event matched the name search
    const [eventList, setEventList] = useState([])
    //accept means an index of eventList
    const [accept, setAccept] = useState()
    const history = useHistory()

    useEffect(() => {
        if(accept){
            const targetEvent = eventList[accept]
            const {_id} = targetEvent
            
            axios({
                method: "post",
                withCredentials:true,
                url: "http://localhost:4000/acceptEvent",
                data: {
                    _id:_id
                }
            })
            .then((res) => {
                
                const {info} = res.data
                console.log(info)
                if (info === "Event accepted.") {
                    alert("Event accepted.")
                }
            })
        // }else {
        //     axios({
        //         method: "get",
        //         withCredentials:true,
        //         url: "http://localhost:4000/checkEventStatus"
        //     })
        //     .then((res) => {
        //         const filteredData = []
        //         res.data.forEach(element => {
        //             if (element.manager === context.username) {
        //                 filteredData.push(element)
        //             }
        //         });
        //     setData(filteredData)
        //     })
        }
    },[accept])

    const getEventByName = () => {
        axios({
            method: "post",
            withCredentials:true,
            url: "http://localhost:4000/getEventByName",
            data: {
                eventName: eventName,
                starName: context.username
            }
        })
        .then((res) => {
            const {message} = res.data
            if (message === "event found.") {
                var a = [];
                const {data} = res.data
                a.push.apply(a,data);
                console.log("a:",a)
                setEventList(a)
            }else {
                alert(`Cannot find event ${eventName}`)
            }
            
        })
    }

    const redirect = (e)=> {
        
        const index = e.target.value
        const targetEvent = eventList[index]
        const {_id} = targetEvent
        let path ='/detailPage/'+ String(_id)
        history.push(path)
    }
    

    return(
        <div className="container">
            <div className="forms">
                <ul>
                    <li>
                        <input placeholder="Enter Event Name" type="text" id="event-name" onChange={(e) => setEventName(e.target.value)}/>
                    </li>
                    <li>
                        <button onClick={getEventByName}>Search</button>
                    </li>
                </ul>
            </div>
            <div className="search-result">
                {
                    eventList !== null && eventList.length !== 0 ? (
                        <>
                        <h3>
                            Result
                        </h3>
                        <table id="search-by-event-name-result" className="tables">
                            <thead>
                                <tr>
                                    <th>Event Name</th>
                                    <th>Event Time</th>
                                    <th>Accept?</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                                <tbody>
                                {eventList.map((item, index) => 
                                <tr key={index} id={index}>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.time}
                                    </td>
                                    <td><button value={index} onClick={(e)=>setAccept(e.target.value)}>Accept</button></td>
                                    <td><button value={index} onClick={redirect}>Check Details</button></td>
                                    {/* <td id="message">{message==="Event accepted."? "Event Accepted" : "Event Haven't Accepted"}</td> */}
                                </tr>
                                )

                                }
                            </tbody>
                        </table>
                        </>
                    ):(
                        <>
                        </>
                        
                    )
                }
            </div>
            
        </div>
    )
}