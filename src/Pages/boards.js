import React from 'react';
import {TextField, Button, Card, Typography, CardActionArea} from '@material-ui/core';
import AppBarStyled from '../Component/AppBar';
import "./rooms.css"


class BoardsInRoom extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      boards : [],
    }

    this.getBoards = this.getBoards.bind(this);
  }

  async getBoards() {
    let {id} = this.props.match.params;
    const res = await fetch(`http://192.168.29.69:8000/boards/room/${id}`);
    const data = await res.json();
    return data;
  }

  async componentDidMount(){
    const boards = await this.getBoards();
    this.setState({boards});
  }

  render(){

    const Board = ({boardName, boardIp}) => (
      <div>
        <Card elevation={5} className="root1" variant="outlined" style={{background: "black", borderColor:'#424242'}}>
          {/* <Link to={`/boards/room/${rId}`} style={{width : "100%", height : "100%", textDecoration: "none"}}> */}
          <CardActionArea style={{height : "100%", color: '#424242'}}>
            <div className="root2">
              <Typography variant="h4">{boardName}</Typography>
              <Typography variant="h4">{boardIp}</Typography>
            </div>
          </CardActionArea>
        </Card>
      </div>
    )

    return(
      <div>
        <AppBarStyled name="Boards"/>
        {/* <Link to='/room/add/'><Button variant="contained" color="primary" style={{width: '95vw'}}><Add/></Button></Link> */}
        <div className="rms">
        {this.state.boards.map((rm) => (
          <div>
          <Board
            boardName={rm.boardName}
            boardIp={rm.boardIp}
          />
          </div>
        ))
        }
        </div>
      </div>
    )
  }
}

export default BoardsInRoom;