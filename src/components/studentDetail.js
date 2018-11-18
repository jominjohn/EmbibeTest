import React, { Component } from 'react';
import { connect } from "react-redux";
import { Loader, Dimmer, Header, Icon, Message } from 'semantic-ui-react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import getStudentsData from '../redux/actionCreators';
import HeaderExampleSettingsIcon from './noRecord';

class StudentDetail extends Component {

  constructor(props) {
    super(props);

    //id of the student
    const id = this.props.match.params.id;

    let studentDetail = {};
    const marksGraph = [];
    if (this.props.studentsData[id]) {
      studentDetail = this.props.studentsData[id];
      const { marks } = studentDetail;

      for (let key in marks) {
        marksGraph.push({
          name: key,
          marks: marks[key]
        })
      }
      
    }
    this.state = {
      studentDetail,
      marksGraph,
      noMatch: false
    }
  }
  
  componentDidMount() {
    const id = this.props.match.params.id;
    if (!this.props.studentsData[id]) {
      // Getting students data
      this.props.getStudentsData();
    }
  }

  componentWillReceiveProps(nextProps) {
    const id = this.props.match.params.id;
    if (Object.keys(nextProps.studentsData).length && !Object.keys(this.props.studentsData).length && nextProps.studentsData[id]) {
      const studentDetail = nextProps.studentsData[id];
      const { marks } = studentDetail;
      const marksGraph = [];
      for (let key in marks) {
        marksGraph.push({
          name: key,
          marks: marks[key]
        })
      }

      this.setState({ studentDetail, marksGraph });
    } else if (Object.keys(nextProps.studentsData).length && !Object.keys(this.props.studentsData).length && !nextProps.studentsData[id]) {
      this.setState({ noMatch: true });

    }
  }

  // calculating total marks
  totalMarks = (marks) => Object.values(marks).reduce((sum, mark) => (sum+mark), 0);

  render() {
    const { studentDetail, marksGraph, noMatch } = this.state;
    
    return (
      <div className="App">
        {
          noMatch ?
          <HeaderExampleSettingsIcon/> :
          (<div>
            {
              (studentDetail && studentDetail.name) ?
              <div style={{ marginTop: '50px' }}>
                <Header as='h2' icon textAlign='center'>
                  <Icon name='user' circular color={'blue'} />
                  <Header.Content>{studentDetail.name}</Header.Content>
                  <Header.Content>Roll No. - {studentDetail.rollNo}</Header.Content>
                  <Header.Content>Total Marks. - {this.totalMarks(studentDetail.marks)}</Header.Content>
                  <Header.Content style={{ display: 'inline-block', marginTop: '20px' }}>
                  
                    <BarChart width={600} height={300} data={marksGraph}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                     <CartesianGrid strokeDasharray="3 3"/>
                     <XAxis dataKey="name"/>
                     <YAxis/>
                     <Tooltip/>
                     <Legend />
                     <Bar dataKey="marks" fill="#3f89ca" barSize={30} />
                    </BarChart>
                  </Header.Content>
                </Header>
              </div>
              : null
            }
          </div>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ studentsData: state.studentsData });

export default connect(mapStateToProps, { getStudentsData })(StudentDetail);;