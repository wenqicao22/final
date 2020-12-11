import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import '../App.css'
import {myContext} from './Context'
import axios from 'axios'
import logo from '../logo192.png'

export default function Nav() {
    const style =  {
        color: 'white'
    }
    const context = useContext(myContext)

    const logout = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:4000/logout"
        })
        .then((res) => {
            if (res.data === "loged out successfully.") {
            window.location.href="/"
            }
        })
    }

    return (
        <nav>
            {/* <img src={logo} alt="Logo" id="Logo" width="70px"/> */}
            <ul className="navList">
            <img src={logo} alt="Logo" id="Logo" width="70px"/>
                {
                    context ? (
                        <>
                            <Link style={style} onClick={logout} to='/logout' >
                                <li>Log Out</li>
                            </Link>
                            {context.managerOrStar==="manager" ?(
                                <>
                                <Link style={style} to='/editEvent'>
                                    <li>Edit Event</li>
                                </Link>
                                <Link style={style} to='/starList'>
                                    <li>Star List</li>
                                </Link>
                                <Link style={style} to='/listEvent'>
                                    <li>List Event</li>
                                </Link> 
                                </>

                            ):(
                                <>
                                <Link style={style} to='/editSchedule'>
                                    <li>Edit Schedule</li>
                                </Link>
                                <Link style={style} to='/updateStar'>
                                    <li>Profile</li>
                                </Link>
                                </>
                            )
                            }
                            
                        </>
                    ) : (
                        <>
                            <Link style={style} to='/'>
                                <li>Login</li>
                            </Link>
                            <Link style={style} to='/about'>
                                <li>About</li>
                            </Link>
                            <Link style={style} to='/register'>
                                <li>Register</li>
                            </Link>
                        </>
                    )
                }
                
                
                
            </ul>
        </nav>
    )
}