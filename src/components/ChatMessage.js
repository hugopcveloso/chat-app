import React from 'react'
import firebase from 'firebase'

const ChatMessage = (props) => {
  
  const {text, uid, photoURL} = props.message
  const {auth} = props
  const messageClass = uid === auth.currentUser.uid
  return (
    <div className={`message ${messageClass ? 'sent' : 'received' }`}>
      <img src={photoURL} alt=""/>
      <p>{text}</p>
    </div>
  )
}

export default ChatMessage
