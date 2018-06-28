import React, { Component } from 'react';
import * as firebase from 'firebase';

var provider = new firebase.auth.GoogleAuthProvider();

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      displayName: ''
    };
  }

login() {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

signOut() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}

componentDidMount() {
    firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
    });
  }

render() {
    return (
      <section className="user-page">
        <button onClick={() => this.login()}>Sign-in</button>
  			<button onClick={() => this.signOut()}>Sign-out</button>
        <div>Logged in: {this.props.user ? this.props.user.displayName : 'Guest'} </div>
        </section>
      )
    }
  }

export default User;
