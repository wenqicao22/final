import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function DetailPage(props){
    const eventId = props.match.params.id
    const [event, setEvent] = useState()
    
    useEffect(() => {
        axios({
            method: "post",
            withCredentials: true,
            url: "http://localhost:4000/getEventById",
            data: {
                _id:eventId
            }
        })
        .then((res) => {
            const {message} = res.data
            if (message === "Event found.") {
                const {data} = res.data
                setEvent(data)
            }
        })
    }, [event, eventId])

    

    
    
    return(
        
        <div className="container">
            <h2>Details</h2>
            {event ? (
                <table className="tables">
                <thead>
                    <tr>
                        <th>
                            Event Name
                        </th>
                        <th>
                            Managed By
                        </th>
                        <th>
                            Event Time
                        </th>
                        <th>
                            Accepted?
                        </th>
                    </tr>
                </thead>
                    <tbody>
                    <tr>
                        <td>
                            {event.name}
                        </td>
                        <td>
                            {event.manager}
                        </td>
                        <td>
                            {event.time}
                        </td>
                        <td>
                            {event.isAccepted === true? "Yes" : "No"}
                        </td>
                    </tr>
                </tbody>
            </table>
            ) : (
                <>
                </>
            )}
            
        </div>
    )
}