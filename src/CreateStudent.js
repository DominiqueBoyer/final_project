import React from 'react';
import { Provider, connect } from 'react-redux';
import {createStudent} from './index.js';

class _CreateStudent extends React.Component{
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gpa:'',
      // school: '',
      error:''
    };
    this.add = this.add.bind(this);
  }
  add(){
    console.log('state', this.state)
    this.props.createIt(this.state);
  }
  render(){
    const { firstName, lastName, email, gpa, school, error } = this.state;
    return (
      <form onSubmit={ev => ev.preventDefault()}>
        First Name <input value={firstName} onChange={(ev) => this.setState({ firstName: ev.target.value})}/>
        Last Name <input value={lastName} onChange={(ev) => this.setState({ lastName: ev.target.value})}/>
        Email <input type="email" value={email} onChange={(ev) => this.setState({ email: ev.target.value})}/>
        GPA <input value={gpa} onChange={(ev) => this.setState({ gpa: ev.target.value})}/>
        {/* Enroll at <input value={school} placeholder='Add School'onChange={(ev) => this.setState({school: ev.target.value})} /> */}
        <button onClick={ this.add }>Save</button>
      </form>
    );
  }
}
const Stuff = connect(null, (dispatch)=> {
  return {
    createIt: async (student)=> dispatch(createStudent(student))
  };
})(_CreateStudent);

export default Stuff;
