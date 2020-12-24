import React from 'react';
import {TextField, Button, Card, Typography, CardActionArea} from '@material-ui/core';
import AppBarStyled from '../Component/AppBar';
import "./rooms.css"

class DevicesInRoom extends React.Component{
    
  constructor(props) {
    super(props);
    this.state = {
        devices : [],
        dState: false,
    }
    this.getDevices = this.getDevices.bind(this);
  }

  async getDevices(){
    let {id} = this.props.match.params;
    const res = await fetch(`http://192.168.29.69:8000/devices/room/${id}`);
    const data = await res.json();
    this.state.dState = data.state;
    return data;
  }

  async componentDidMount(){
    const devices = await this.getDevices();
    this.setState({devices : devices});
    console.log(this.state.devices);
  }

  render(){
    const Device = ({deviceName, state}) => (
      <div>
        <Card elevation={5} className="root1" variant="outlined" style={{background: "black", borderColor:'#424242'}}>
          {/* <Link to={`/boards/room/${rId}`} style={{width : "100%", height : "100%", textDecoration: "none"}}> */}
          <CardActionArea style={{height : "100%", color: '#424242'}}>
            <div className="root2">
              <Typography variant="h4">{deviceName}</Typography>
              <Typography variant="h4">{state}</Typography>
            </div>
          </CardActionArea>
        </Card>
      </div>
    )

    return(
      <div>
        <AppBarStyled name="Devices"/>
        {/* <Link to='/room/add/'><Button variant="contained" color="primary" style={{width: '95vw'}}><Add/></Button></Link> */}
        <div className="rms">
        {this.state.devices.map((rm) => (
          <div>
          <Device
            deviceName={rm.deviceName}
            state={rm.state.toString()}
          />
          </div>
        ))
        }
        </div>
      </div>
    )
  }
}


export default DevicesInRoom;