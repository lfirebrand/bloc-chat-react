import React, { Component } from 'react';
import moment from 'moment';

const Firebase = require('firebase');

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
     messages: [],
     value: '',
     activeRoom: '',
     user: '',
     displayName: '',
     newMessage: '',
};

this.handleSubmit = this.handleSubmit.bind(this);
this.handleChange = this.handleChange.bind(this);
this.messagesRef = this.props.firebase.database().ref('Messages');
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

createMessage(value) {
  this.messagesRef.push({
  content: this.state.value,
  username: this.props.user ? this.props.user.displayName: 'Guest',
  sentAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
  roomId: this.props.activeRoom.key
  });
}

handleChange(event) {
   this.setState({
     value: event.target.value,
   });
 }

handleSubmit(event) {
  this.createMessage();
  event.preventDefault();
  this.setState({value: ''});
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

         <form onSubmit={this.handleSubmit}>
           <label>
           Message:
           <input type="text" value={this.state.value} onChange={this.handleChange} />
           </label>
           <input type="submit" value="Submit" />
         </form>
      </div>
    )
  }
}


export default MessageList;
