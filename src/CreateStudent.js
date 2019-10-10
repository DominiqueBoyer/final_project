import React from 'react';
import { connect } from 'react-redux';
import { createStudentThunk, getSchoolsThunk } from './store';

class _CreateStudent extends React.Component{
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      GPA:'',
      schoolId: '',
      error:''
    };
    this.create = this.create.bind(this);
  }
  async componentDidMount(){
    await this.props.getSchools()
  }
  async create(){
    //console.log('state', this.state)
    await this.props.create(this.state);
    this.setState({firstName: '',
    lastName: '',
    email: '',
    GPA:'',
    schoolId: ''
    })
  }
  render(){
    const { firstName, lastName, email, GPA, schoolId, error } = this.state;
    const {schools} = this.props;
    return (

      <form onSubmit={ev => ev.preventDefault()}>
        <label>First Name <input value={firstName} onChange={(ev) => this.setState({ firstName: ev.target.value})}/></label>
        <label>Last Name <input value={lastName} onChange={(ev) => this.setState({ lastName: ev.target.value})}/></label>
        <label>Email <input type="email" value={email} onChange={(ev) => this.setState({ email: ev.target.value})}/></label>
        <label>GPA <input value={GPA} onChange={(ev) => this.setState({ GPA: ev.target.value})}/></label>
        <label>Enroll at
          <select name="school" value={schoolId} onChange={ev => this.setState({ schoolId: ev.target.value})}>
            <option value="null">Not Enrolled</option>
            {
              schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)
            }
          </select>
        </label>
        <button onClick={this.create }>Save</button>
      </form>
    );
  }
}

const mapStateToProps = (state)=> {
  return {
    schools: state.schools
  };
}
const CreateStudent = connect(mapStateToProps, (dispatch)=> {
  return {
    create: async (student)=> dispatch(createStudentThunk(student)),
    getSchools: async () => dispatch(getSchoolsThunk())
  };
})(_CreateStudent);

export default CreateStudent;
