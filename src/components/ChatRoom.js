import React, { useRef, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage'

import firebase from 'firebase'



const ChatRoom = ({ auth, firestore}) => {
  // const auth = firebase.auth();
  // const firestore = firebase.firestore(); 
  const dummy = useRef();
  const messagesRef = firestore.collection('messages')

  const query = messagesRef.orderBy('createdAt').limit(25)
  const [messages] = useCollectionData(query, {idField : 'id'});
  
  const [formValue, setFormValue] = useState('')

  const sendMessage = async(e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });
    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
   
  return (
    <div>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} auth={auth}/>)}
        <span ref={dummy}></span>
      </div>
      <form action="" onSubmit={sendMessage}>
        <input type="text"
          value={formValue} 
          onChange={(e)=> setFormValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ChatRoom
