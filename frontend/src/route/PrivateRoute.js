import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { myContext } from './Context'


export default function PrivateRoute({children, ...rest}) {
    const context = useContext(myContext)
    return (
        <Route {...rest} render={({location}) => {
            console.log()
            return context !== null
            ? children
            : <Redirect to={{
                pathname:'/',
                state: { from: location}
            }} />
        }}/>
    )
}