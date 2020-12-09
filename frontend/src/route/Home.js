import React, {useContext } from 'react'
import {myContext} from './Context'


function Home () {
  const context = useContext(myContext)
  console.log(context)
   
        
  return (
      <div>
        {context? (
            <div>
                Welcome {context.username}
            </div>
        ) : (
            <div>
                Welcome to star management app!
            </div>
        )}
      </div>
  )
    
}
export default Home