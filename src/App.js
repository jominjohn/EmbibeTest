import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import StudentsList from './components/studentsList';
import StudentDetail from './components/studentDetail';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={StudentsList}/>
        <Route path='/:id' component={StudentDetail}/>
      </Switch>
    );
  }
}

export default App;
