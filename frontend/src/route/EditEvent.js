
import React, {useContext, useEffect, useState } from 'react'
import {myContext} from './Context'
import axios from 'axios'

function EditEvent () {
  const context = useContext(myContext)
  const [data, setData] = useState()
  const [selectedEvent, setSelectedEvent] = useState()
  

  useEffect(() => {
    axios({
      method: "get",
      withCredentials:true,
      url: "http://localhost:4000/getallevent"
    })
    .then ((res) => {
      setData(res.data)
    })
  },[context,data])
    
  if (context.managerOrStar !== "manager") {
    return (
        <div className="non-admin">
            This page is for manager only.
        </div>
    )
}
  //if no data?
  if (!data) {
    return (
      <div>
        No Event So Far.
      </div>
    )
  }

  const deleteEvent = () => {
    let eventId;
    if (data){
        data.forEach(element => {
        if (element.name === selectedEvent) {
            eventId = element.id
        }
        });
    }
    axios({
      method: "delete",
      withCredentials:true,
      data: {
        id: eventId
      },
      url: "http://localhost:4000/deleteevent"
    })
  }
        
  return (
      <div>
        <h1>
          Welcome to Edit Event Page!
        </h1>
        <select onChange={e => setSelectedEvent(e.target.value)} name='deleteevent' id='deleteevent'>
        <option id="Select-A-Event">Select A Event</option>
        {
          data.map((element) => {
            return (
              <option key={element.name} id={element.name}>{element.name}</option>
            )
          })
        }
        </select>
        <button onClick={deleteEvent}>Delete Event</button>
      </div>
  )
    
}
export default EditEvent