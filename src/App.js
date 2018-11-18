import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Loader, Dimmer, Message } from 'semantic-ui-react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import StudentsList from './components/studentsList';
import StudentDetail from './components/studentDetail';

class App extends Component {

  render() {
  	const { isLoader, isError } = this.props;
    return (
    	<div>
	      	<Switch>
		        <Route exact path='/' component={StudentsList}/>
		        <Route path='/:id' component={StudentDetail}/>
	      	</Switch>
	        <Dimmer active={isLoader} inverted>
	          <Loader>
	          {
	            isError ? 
	            	<Message
	            		error
					    icon='x'
					    header='Error!!'
					    content='You encountered an error'
					 /> : null
	          }
	          </Loader>
	        </Dimmer>
    	</div>
    );
  }
}

const mapStateToProps = (state) => ({ isError: state.isError, isLoader: state.isLoader });

export default withRouter(connect(mapStateToProps)(App));