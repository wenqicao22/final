import React,{useContext, useHistory} from 'react'
import axios from 'axios'
import {myContext} from './Context'

export default function Logout() {
    const history = useHistory()
    const context = useContext(myContext)

    const logout = () => {
        axios({
            method:"get",
            withCredentials:true,
            url: "http://localhost:4000/logout"
        })
    }
    return (
        <div className="container">
        {context ? (
            <>
            <button onClick={logout}>Sign Out</button>
            </>
        ) : (
            <div>
                Please login first.
            </div>
        )}
        </div>
    )
}