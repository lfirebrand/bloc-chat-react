import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
      super(props);
      this.state = {
     rooms: [],
     value:'',
     activeRoom: ''
   };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.roomsRef = this.props.firebase.database().ref('rooms');
}

componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
      console.log(this.state.rooms);
     });
}

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

selectRoom(room) {
    console.log(room.name)
    this.props.selectActiveRoom(room);
  }

render() {
    return (
      <div className='roomlist'>
        {
          !this.state.rooms.length > 0 ? (

          <div className="loading">
            <div className="block"></div>
            <div className="block"></div>
            <div className="block"></div>
          </div>
          ) :
          this.state.rooms.map( (room, index) =>
          <li
         key={index}
         onClick={(event) => this.selectRoom(room, event)}
         >
         {room.name}
         </li>
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
