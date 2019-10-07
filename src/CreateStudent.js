import React from 'react';
import { connect } from 'react-redux';
import { createStudentThunk } from './store';

class _CreateStudent extends React.Component{
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      GPA:'',
      // school: '',
      error:''
    };
    this.create = this.create.bind(this);
  }
  async create(){
    console.log('state', this.state)
    await this.props.create(this.state);
    this.setState({firstName: '',
    lastName: '',
    email: '',
    GPA:'',})
  }
  render(){
    const { firstName, lastName, email, GPA, school, error } = this.state;
    return (

      <form onSubmit={ev => ev.preventDefault()}>
        First Name <input value={firstName} onChange={(ev) => this.setState({ firstName: ev.target.value})}/>
        Last Name <input value={lastName} onChange={(ev) => this.setState({ lastName: ev.target.value})}/>
        Email <input type="email" value={email} onChange={(ev) => this.setState({ email: ev.target.value})}/>
        GPA <input value={GPA} onChange={(ev) => this.setState({ GPA: ev.target.value})}/>
        {/* Enroll at <input value={school} placeholder='Add School'onChange={(ev) => this.setState({school: ev.target.value})} /> */}
        <button onClick={ this.create }>Save</button>
      </form>
    );
  }
}
const CreateStudent = connect(null, (dispatch)=> {
  return {
    create: async (student)=> dispatch(createStudentThunk(student))
  };
})(_CreateStudent);

export default CreateStudent;
