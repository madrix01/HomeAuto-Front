import React from 'react';
import { Card, Typography, CardActionArea} from '@material-ui/core';
import AppBarStyled from '../Component/AppBar';
import "./rooms.css"

class DevicesInRoom extends React.Component{
    
  constructor(props) {
    super(props);
    this.state = {
      devices : [],
    }
    this.getDevices = this.getDevices.bind(this);
  }

  async getDevices(){
    let {id} = this.props.match.params;
    const res = await fetch(`http://192.168.29.69:8000/devices/room/${id}`);
    const data = await res.json();
    this.setState({devices : data});
    return data;
  }

  async handleSubmit(dev){
    return event => {
      const sendIoReq = async () => { 
        var reqBody = `boardId=${dev.boardId}&pinAdress=${dev.pinAdress}&stateTc=${!dev.state}`;
        dev.state = !dev.state
        console.log(reqBody);
        const response = await fetch('http://192.168.29.69:8000/io/', {
          method: 'POST',
          headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
          },
          body : reqBody
        });
        const data = await response.json();
        console.log(data);
      }
      sendIoReq().then(console.log("Request sent")).then(console.log(this.state.devices[1]));
      event.preventDefault();
    }
  }


  async componentDidMount(){
    const devices = await this.getDevices();
    this.setState({devices : devices});
  }

  // this.state.devices[index].state?"green": "red"
  render(){
    const Device = (devc, index) => (
      <div>
        <Card elevation={5} className="root1" variant="outlined" style={{background: 'black' , borderColor:'#424242'}} onClick={this.handleSubmit(devc.devc)}>
          <CardActionArea style={{height : "100%", color: '#424242'}}>
            <div className="root2">
              <Typography variant="h4">{devc.devc.deviceName}</Typography>
              <Typography variant="h4">{devc.devc.state.toString()}</Typography>
            </div>
          </CardActionArea>
        </Card>
      </div>
    )

    return(
      <div>
        <AppBarStyled name="Devices"/>
        <div className="rms">
        {this.state.devices.map((rm, index) => (
          <div>
          <Device
            devc={rm}
            index={index}
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