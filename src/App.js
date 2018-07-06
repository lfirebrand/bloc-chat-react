import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
  constructor(props) {
    super(props);
    this.state = {
     activeRoom: '',
   }
    this.selectActiveRoom = this.selectActiveRoom.bind(this);
  }

selectActiveRoom(room) {
    this.setState({ activeRoom: room })
  }

setUser(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Bloc Chat</h1>
          <User firebase = { firebase}
            user = {this.state.user}
            setUser = {this.setUser.bind(this)}
           />
        </header>
        <main>
        <RoomList firebase={ firebase }
          activeRoom = {this.state.activeRoom}
          selectActiveRoom = {this.selectActiveRoom}
        />
        </main>
        <section>
        <MessageList firebase= { firebase }
          activeRoom = {this.state.activeRoom}
          user = {this.state.user}
        />
        </section>
      </div>
    );
  }
}

export default App;
