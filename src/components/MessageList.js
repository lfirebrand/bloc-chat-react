import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
     messages: []
};
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

render() {
    return (
      <div className="message-list">
      <h1>Messages</h1>
        {console.log(this.props.activeRoom)}
        <p>{this.props.activeRoom.name}</p>
         {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) =>
           <li key={index}>{message.username}: {message.content} | Sent at: {message.sentAt}</li>
         )}
      </div>
    )
  }
}


export default MessageList;
