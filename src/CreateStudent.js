import React from 'react';
import { Provider, connect } from 'react-redux';

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
    this.create = this.create.bind(this);
  }
  async create(){
    await this.props.create(this.state);
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
        <button onClick={ this.create }>Save</button>
      </form>
    );
  }
}
const CreateStudent = connect(null, (dispatch)=> {
  return {
    create: async (student)=> dispatch(createStudent(student))
  };
})(_CreateStudent);

export default CreateStudent;
