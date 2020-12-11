import React, {useContext } from 'react'
import {myContext} from './Context'


function Home () {
  const context = useContext(myContext)
  console.log(context)
   
        
  return (
      <div className="container"> 
        {context? (
            <div>
                <h2 className="home">
                Welcome {context.username}
                </h2>
            </div>
        ) : (
            <div>
                <h2 className="home">
                Welcome to star management app!
                </h2>
            </div>
        )}
      </div>
  )
    
}
export default Home