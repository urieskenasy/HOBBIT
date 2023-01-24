import React from 'react'
import {BiMessageRoundedError} from 'react-icons/bi'

function NoHobbisYet() {
  return (
    <div>
        <div><BiMessageRoundedError/></div>
        <h3>You didn't decide on any hobbies yet. Please choose some, so we can connect you with other people with the same passions. </h3>

    </div>
  )
}

export default NoHobbisYet