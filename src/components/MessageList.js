import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
     messages: [],
     user: '',
     content: '',
     sentAt: '',
     roomId: '',
     newMessageContent: ''
};
this.handleMessageChange = this.handleMessageChange.bind(this);
this.handleChange = this.handleChange.bind(this);
this.messagesRef = this.props.firebase.database().ref('Messages');
this.createMessage = this.createMessage.bind(this);
};

componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      console.log(message);
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
      console.log(this.state.messages);
     });
}

handleChange(event) {
   this.setState({
     content: event.target.value,
     username: this.props.user,
     sentAt: this.firebase.database.ServerValue.TIMESTAMP,
     roomId: this.props.activeRoom.key
   });
 }

handleMessageChange(event){
    this.setState({newMessageContent:event.target.value})
  }

createMessage(value) {
  this.messagesRef.push({
  content: this.state.newMessageContent,
  username: this.props.user.displayName,
  sentAt: this.firebase.database.ServerValue.TIMESTAMP,
  roomId: this.props.activeRoom.key
  });
  this.setState({newMessageContent:''})
}

render() {
    return (
      <div className="message-list">
      <h1>Messages</h1>
        {console.log(this.props.activeRoom)}
        <p>{this.props.activeRoom.name}</p>
         {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) =>
           <li key={index}>{message.username}: {message.content} | Sent at: {message.sentAt}</li>
         )}

         <form onSubmit={(event) => { this.createNewMessage(event) }}>
           <label>
           Message:
           <input type="text" placeholder="Say something cool" value={this.state.newMessageContent} onChange={this.handleMessageChange} />
           </label>
           <input type="submit" value="Submit" />
         </form>
      </div>
    )
  }
}


export default MessageList;
