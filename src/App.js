import React from 'react';
import './App.css';
import {AddRoom, AllRooms} from './Pages/rooms'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TemporaryDrawer from './Component/sideBar'
import AppBarStyled from './Component/AppBar'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={AllRooms}/>
          <Route path='/room/add' component={AddRoom}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
