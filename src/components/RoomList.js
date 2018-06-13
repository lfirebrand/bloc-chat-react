import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
      super(props);
      this.state = {
       rooms: [],
       value:''
 };
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.roomsRef = this.props.firebase.database().ref('rooms');
};

createRoom(value) {
  this.roomsRef.push({
  name: this.state.value
  });
}

handleChange(event) {
   this.setState({value: event.target.value});
 }

handleSubmit(event) {
  this.createRoom();
  event.preventDefault();
  this.setState({value: ''});
}

componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      /* room.key = snapshot.key; */
      this.setState({ rooms: this.state.rooms.concat( room ) })
      console.log(this.state.rooms);
     });
}

render() {
    return (
      <div className='roomlist'>
        { this.state.rooms.map( (room) =>
          <li key={ room.key }> { room.name }</li>
        )}

        <form onSubmit={this.handleSubmit}>
          <label>
            Room:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
    );
  }
}

export default RoomList;
