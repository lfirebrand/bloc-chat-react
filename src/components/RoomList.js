import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
      super(props);
      this.state = {
       rooms: [],
       value:''
 };

  this.roomsRef = this.props.firebase.database().ref('rooms');
};

componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      // room.key = snapshot.key; //
      this.setState({ rooms: this.state.rooms.concat( room ) })
      console.log(this.state.rooms);
     });
}

render() {
    return (
      <ul className='roomlist'>
      { this.state.rooms.map( (room) =>
        <li key={ room.key }> { room }</li>
      )}
      </ul>
    );
  }
}

export default RoomList;
