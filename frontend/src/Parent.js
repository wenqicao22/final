import React, { useContext } from 'react';
import {Route, Switch} from 'react-router-dom';
import App from "./App";
import Register from './route/Register'
import Nav from './route/Nav'
import ListEvent from './route/ListEvent'
import StarList from './route/StarList'
import EditEvent from './route/EditEvent'
import About from './route/About'
import Home from './route/Home'
import EditSchedule from './route/EditSchedule'
import UpdatePassword from './route/UpdatePassword'
import { myContext } from './route/Context';



export default function Parent(props) {
    const context = useContext(myContext)

    return (
        <div className='Parent'>
            
            <Nav />
            <Switch>
                <Route path='/home' exact component={Home} />
                <Route path='/about' exact component={About} />
                {
                    context ? (
                        <>
                            {context.managerOrStar==="manager" ? (
                                <>
                                <Route path='/editEvent' exact >
                                    <EditEvent/>
                                </Route> 
                                <Route path='/starList' exact>
                                    <StarList/>
                                </Route> 
                                <Route path='/listEvent' exact>
                                    <ListEvent/>
                                </Route> 
                                </>
                            ) : (
                                <>
                                <Route path='/editSchedule' exact>
                                    <EditSchedule/>
                                </Route>
                                <Route path='/updatePassword' exact>
                                    <UpdatePassword/>
                                </Route>
                                </>
                            )}
                            
                        </>
                    ) : (
                        <>
                        <Route path='/' exact component={App} />
                        <Route path='/register' exact component={Register} />
                        </>
                    )
                }
            
                

                
                <Route path='*' component={() => '404 Not Found'} />
               
            </Switch>
        </div>
    )
}