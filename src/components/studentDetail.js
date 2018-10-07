import React, { Component } from 'react';
import { connect } from "react-redux";
import { Loader, Dimmer, Header, Icon } from 'semantic-ui-react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import getStudentsData from '../redux/actionCreators';

class StudentDetail extends Component {

  constructor(props) {
    super(props);

    //id of the student
    const id = this.props.match.params.id;

    let studentDetail = {};
    let marksGraph = [];
    if (this.props.studentsData[id]) {
      studentDetail = this.props.studentsData[id];
      marksGraph = [
        {
          name: 's1',
          marks: studentDetail.marks.s1
        }, {
          name: 's2',
          marks: studentDetail.marks.s2
        }, {
          name: 's3',
          marks: studentDetail.marks.s3
        }
      ]
    }
    this.state = {
      studentDetail,
      isLoader: false,
      marksGraph
    }
  }
  
  componentDidMount() {
    const id = this.props.match.params.id;
    if (!this.props.studentsData[id]) {
      // Getting students data
      this.props.getStudentsData();
      this.setState({ isLoader: true })
    }
  }

  componentWillReceiveProps(nextProps) {
    const id = this.props.match.params.id;
    const studentDetail = nextProps.studentsData[id];
    const marksGraph = [
      {
        name: 's1',
        marks: studentDetail.marks.s1
      }, {
        name: 's2',
        marks: studentDetail.marks.s2
      }, {
        name: 's3',
        marks: studentDetail.marks.s3
      }
    ]
    this.setState({ studentDetail, isLoader: false, marksGraph });
  }

  // calculating total marks
  totalMarks = (marks) => (marks.s1 + marks.s2 + marks.s3);

  render() {
    const { studentDetail, isLoader, marksGraph } = this.state;
    
    return (
      <div className="App">
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
        <Dimmer active={isLoader} inverted>
          <Loader />
        </Dimmer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ studentsData: state });

export default connect(mapStateToProps, { getStudentsData })(StudentDetail);;