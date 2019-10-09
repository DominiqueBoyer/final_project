import React from 'react';
import { connect } from 'react-redux';
import { getSchoolsThunk, getStudentsThunk, updateStudentThunk } from './store';


// class _School extends React.Component{
//   constructor(id){
//     super();
//     // this.updateStudent = this.updateStudent.bind(this);
//   }
//   // async componentDidMount(){
//   //   const id = this.props.match.params.id
//   //   await this.props.getSchool(id)
//   // }
//   // async updateStudent(){
//   //   await this.props.updateStudent()
//   // }
//   render(){
//     // const {schools} = this.props;
//     // console.log(schools)
//     console.log(id)
//     return (
//       <hr/>
//     );
//   }
// }

const _School = ({ id, students, schools }) => {
  console.log(id, schools)
  const school = schools.filter( school => school.id === id)
  console.log(school)
  return(
    <div>
      <h1>Hello</h1>
    </div>
  );
}



const mapStateToProps = (state)=> {
  return {
    schools: state.schools,
    students: state.students
  };
}

const dispatchToProps = {
  getSchools: getSchoolsThunk,
  getStudents: getStudentsThunk,

};

const School = connect(mapStateToProps, dispatchToProps)(_School)

export default School;
