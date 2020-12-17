import React from 'react';
import {TextField, Button, Card, Typography, CardActionArea} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import './rooms.css'
import { Link, Redirect, useHistory } from 'react-router-dom';
import AppBarStyled from '../Component/AppBar';

class AddRoom extends React.Component{

  constructor(props){
      super(props);
      this.state = {
          roomName : '',
          floor : '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
          [name] : value
      })

  }

  handleSubmit(event) {
    const addRoomReq = async () => {
      if(this.state.roomName === "" || this.state.floor === ""){
        alert("Cannot submit empty fields ❌");
        return;
      }
      var reqBody = `roomName=${this.state.roomName}&floor=${this.state.floor}`
      const response = await fetch('http://192.168.29.69:8000/room/add/', {
        method: 'POST',
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body : reqBody
      });
      const data = await response.json();
      console.log(data);
      if(response.status === 200){
        alert("Room added successfully :)");
      }else{
        alert("There was an error adding romm :(");
      }
    }
    addRoomReq();
    event.preventDefault();
  }

  render(){

      return(
          <div>
              <AppBarStyled name="Add Room"/>
              <form onSubmit={this.handleSubmit}>
              <div className="formDiv">
                <TextField
                  autoComplete="off"
                  inputProps={{
                    style : {
                      color : 'white',
                    }
                  }}
                  InputLabelProps={{
                    style : {
                      color : 'white'
                    }
                  }}
                  style = {{margin: "10px"}}
                  label="Room Name"
                  variant="outlined"
                  name="roomName"
                  value={this.state.roomName}
                  onChange={this.handleChange}/>
                <TextField
                  autoComplete="off"
                  inputProps={{
                    style : {
                      color : 'white',
                    }
                  }}
                  InputLabelProps={{
                    style : {
                      color : 'white'
                    }
                  }}
                  style = {{margin: "10px"}}
                  label="Floor No." 
                  variant="outlined" 
                  name="floor"
                  value={this.state.floor} 
                  onChange={this.handleChange}/>
                <Button variant="contained" color="primary" type="submit" style = {{margin: "10px"}}>Add</Button>
              </div>
              </form>
          </div>
      )
  }
}

class AllRooms extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      rooms : [],
    }

    this.getRooms = this.getRooms.bind(this);
  }

  async getRooms() {
    const res = await fetch("http://192.168.29.69:8000/room/");
    const data = await res.json();
    console.log(data);
    return data;
  }

  async componentDidMount(){
    const rooms = await this.getRooms();
    this.setState({rooms});
  }

  render(){
    const Room = ({roomName, floor}) => (
      <div>
        <Card elevation={5} className="root1" variant="outlined" style={{background: "#000000", borderColor:'#424242'}}>
          <CardActionArea>
            <div className="root2">
              <Typography variant="h4">{roomName}</Typography>
              <Typography variant="h4">{floor}</Typography>
            </div>
          </CardActionArea>
        </Card>
      </div>
    )
    return(
      <div>
        <AppBarStyled name="Rooms"/>
        <Link to='/room/add/'><Button variant="contained" color="primary" style={{width: '95vw'}}><Add/></Button></Link>
        <div className="rms">
        {this.state.rooms.map((rm) => (
          <div>
          <Room
            roomName={rm.roomName}
            floor={rm.floor}
          />
          </div>
        ))
        }
        </div>
      </div>
    )
  }
}


export {AllRooms, AddRoom};
