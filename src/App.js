import React from 'react';
import './App.css';
import {AddRoom, AllRooms} from './Pages/rooms'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TemporaryDrawer from './Component/sideBar'
import AppBarStyled from './Component/AppBar'
import BoardsInRoom from './Pages/boards'
import DevicesInRoom from './Pages/devices'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={AllRooms}/>
          <Route path='/room/add' component={AddRoom}/>
          <Route path='/boards/room/:id' component={BoardsInRoom}/>
          <Route path='/devices/room/:id' component={DevicesInRoom} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
