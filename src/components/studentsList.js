import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Input, Icon, Card, Loader, Dimmer } from 'semantic-ui-react'

import getStudentsData from '../redux/actionCreators';
import './studentsList.css';

class StudentsList extends Component {

  state = {
    studentsData: [],
    sortOnName: 'desc',
    sortOnMarks: 'desc',
    isLoader: true
  }  
  componentDidMount() {
    //Calling action to get student data
    this.props.getStudentsData();
  }

  componentWillReceiveProps(nextProps) {
    let studentsData = [];

    //converting to array
    for( let key in nextProps.studentsData ) {
      studentsData.push(nextProps.studentsData[key])
    }
    this.studentsData = studentsData;
    this.setState({ studentsData, isLoader: false });
  }

  searchText = (e) => {
    let studentsData = [];
    let searchText = e.target.value;
    if (searchText === '') {
      studentsData = this.studentsData;
    } else {
      studentsData = this.studentsData.filter(student => {
        if (student.name.toLowerCase().indexOf(searchText.toLowerCase()) === 0 ) {
          return true;
        } else {
          return false;
        }
      });
    }
    this.setState({ studentsData });
  }

  // sorting on name
  sortOnName = (e) => {
    let studentsData = [];
    let { sortOnName } = this.state;
    if (sortOnName === 'desc') {
      studentsData = this.state.studentsData.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
      });

      sortOnName = 'asc';

    } else {
      studentsData = this.state.studentsData.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        return (aName > bName) ? -1 : (aName < bName) ? 1 : 0;
       })

      sortOnName = 'desc';
    }

    this.setState({ studentsData, sortOnName });
  }

  // sorting on marks
  sortOnMarks = (e) => {
    let studentsData = [];
    let { sortOnMarks } = this.state;
    if (sortOnMarks === 'desc') {
      studentsData = this.state.studentsData.sort((a, b) => {
        const aMarks = a.marks.s1 + a.marks.s2 + a.marks.s3;
        const bMarks = b.marks.s1 + b.marks.s2 + b.marks.s3;
        return (aMarks - bMarks);
      });

      sortOnMarks = 'asc';

    } else {
      studentsData = this.state.studentsData.sort((a, b) => {
        const aMarks = a.marks.s1 + a.marks.s2 + a.marks.s3;
        const bMarks = b.marks.s1 + b.marks.s2 + b.marks.s3;
        return (bMarks - aMarks);
      });

      sortOnMarks = 'desc';
    }

    this.setState({ studentsData, sortOnMarks });
  }

  // Total marks calculation
  totalMarks = (marks) => (marks.s1 + marks.s2 + marks.s3);

  render() {
    const { studentsData, isLoader, sortOnName, sortOnMarks }= this.state;
    return (
      <div className="App">
      <div className="Header">
        <Input icon='search' placeholder='Search...' onChange={this.searchText} style={{flex: 3}}/>
        <div style={{flex: 1}}>
          <Button icon onClick={this.sortOnName}>
            <Icon name={(sortOnName === 'asc') ? 'sort alphabet up' : 'sort alphabet down'} />
          </Button>
          <Button icon onClick={this.sortOnMarks}>
            <Icon name={(sortOnMarks === 'asc') ? 'sort numeric up' : 'sort numeric down'} />
          </Button>
        </div>
      </div>

        <Card.Group className="CardGroup">
          {
            studentsData.map((student, i) => (
            <Card key={i} onClick={() => this.props.history.push(`/${student.rollNo}`)} className="Card">
              <Card.Content>
                <Card.Header>{student.name}</Card.Header>
                <Card.Meta>Roll No. {student.rollNo}</Card.Meta>
                <Card.Description>
                  Total Marks <strong>{this.totalMarks(student.marks)}</strong>
                </Card.Description>
              </Card.Content>
            </Card>
            ))
          }
        </Card.Group>
        <Dimmer active={isLoader} inverted>
          <Loader />
        </Dimmer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ studentsData: state });

export default connect(mapStateToProps, { getStudentsData })(StudentsList);;
