import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAR7bdqIFcD1r-zfMgqAG6q5_HwxPqECKo",
  authDomain: "bloc-chat-react-2-dee73.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-2-dee73.firebaseio.com",
  projectId: "bloc-chat-react-2-dee73",
  storageBucket: "bloc-chat-react-2-dee73.appspot.com",
  messagingSenderId: "428180162855"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Bloc Chat</h1>
        </header>
        <main>
        <RoomList firebase={ firebase } />
        </main>
      </div>
    );
  }
}

export default App;
