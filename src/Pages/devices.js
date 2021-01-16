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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getDevices(){
    let {id} = this.props.match.params;
    const res = await fetch(`http://192.168.29.69:8000/devices/room/${id}`);
    const data = await res.json();
    console.log('executed');
    return data;
  }

  handleSubmit(dev, i){
    return event => {
      const sendIoReq = async () => { 
        var reqBody = `boardId=${dev.boardId}&pinAdress=${dev.pinAdress}&stateTc=${!dev.state}`;
        //dev.state = !dev.state
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
      let dvcs = this.state.devices;
      dvcs[i].state = !dev.state;
      this.setState({devices : dvcs});
      sendIoReq();
      event.preventDefault();
    }
  }


  async componentDidMount(){
    const devices = await this.getDevices();
    this.setState({devices : devices});
    console.log(this.state.devices);
  }

  render(){
    console.log('length' ,this.state.devices.length);
    if(!this.state.devices.length){
      console.log('its null');
      return null;
    }
    let Device = () => (
      <div className='rms'>
        {this.state.devices.map((devc, i) => (
          <div>
            <Card elevation={5} className="root1" variant="outlined" style={{background:  this.state.devices[i].state?"green": "red" , borderColor:'#424242'}} onClick={this.handleSubmit(devc,i)}>
              <CardActionArea style={{height : "100%", color: '#424242'}}>
              <div className="root2">
                <Typography variant="h4">{devc.deviceName}</Typography>
                <Typography variant="h4">{devc.state.toString()}</Typography>
              </div>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>      
    )

    return(
      <div>
        <AppBarStyled name="Devices"/>
        <Device/>
      </div>
    )
  }
}


export default DevicesInRoom;