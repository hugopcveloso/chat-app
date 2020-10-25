import React from 'react'
import '../App.css';

import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth';
 
import ChatRoom from './ChatRoom'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyD-Uyc36J9XmtZuTuPdokbSno6faYtLQ_4",
    authDomain: "conversasfuturistas.firebaseapp.com",
    databaseURL: "https://conversasfuturistas.firebaseio.com",
    projectId: "conversasfuturistas",
    storageBucket: "conversasfuturistas.appspot.com",
    messagingSenderId: "1002981606421",
    appId: "1:1002981606421:web:546b1255c9550557e1ba1c",
    measurementId: "G-G2VZLPM7Y3"
  })
}


const auth = firebase.auth(); 
const firestore = firebase.firestore();

const App = () => {
  const [user] = useAuthState(auth)
  
  return (
    <div className="App">
      <header className="App-header">
        <h2>FutureTalks</h2>
        <SignOut />
      </header>
      <section>
       { user ? <ChatRoom auth={auth} firestore={firestore} firebase={firebase} /> : <SignIn />}
      </section>
    </div>
  );
}


const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  
    )
}

const SignOut = () => {
  return auth.currentUser && (
    <button onClick={()=> auth.signOut()}>SignOut</button>
  )
}


export default App;
 