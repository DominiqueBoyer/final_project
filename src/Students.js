import React from 'react';
import { connect } from 'react-redux';
import { deleteStudentThunk, getStudentsThunk, updateStudentThunk, getSchoolsThunk } from './store';

class _Students extends React.Component{
  constructor(props){
    super();
    this.deleteStudent = this.deleteStudent.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
  }
  async componentDidMount(){
    await this.props.getStudents()
    await this.props.getSchools()

  }
  async deleteStudent(id){
    await this.props.deleteStudent(id)
  }
  async updateStudent(student){
    // console.log('studnets',student)
    await this.props.updateStudent(student)
  }
  render(){
    const {students, schools } = this.props;
    // console.log(this.props.students)
    return (
      <div className='students'>
        {
          students.map( student =>
            <li key={student.id}>
              <div> {student.firstName} {student.lastName} </div>
              <div> GPA {student.GPA} </div>
              <select onChange={(ev)=> this.updateStudent({id: student.id, schoolId: ev.target.value})}>
                <option selected={student.schoolId===null}>Not Enrolled</option>
                {
                  schools.map(school => (
                    <option key={school.id} value={school.id} selected={student.schoolId===school.id}>{school.name}</option>
                  ))
                }
                {/* <option>Brown</option>
                <option>MIT</option>
                <option>Cal Poly SLO</option>
                <option>Harvard</option>
                <option>CCNY</option> */}
              </select>
              <br/>
              <button onClick={ () => this.deleteStudent(student.id) }>Delete Student</button>
            </li>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    students: state.students,
    schools: state.schools
  };
}

//this works even if iam pasing something into the function
const dispatchToProps = {
  getStudents: getStudentsThunk,
  deleteStudent: deleteStudentThunk,
  updateStudent: updateStudentThunk,
  getSchools: getSchoolsThunk
}
//if im not using state but using dispatch must pass in null value to state
const Students = connect(mapStateToProps, dispatchToProps)(_Students)

export default Students;


// const _Students = ({ students })=>{
//   return (
//     <div className='students'>
//       {
//         students.map( student =>
//           <li key={student.id}>
//             <div> {student.firstName} {student.lastName} </div>
//             <div> GPA {student.GPA} </div>
//             <select>
//               <option>Not Enrolled</option>
//               <option>Brown</option>
//               <option>MIT</option>
//               <option>Cal Poly SLO</option>
//               <option>Harvard</option>
//               <option>CCNY</option>
//             </select>
//             <br/>
//             <button>Delete Student</button>
//           </li>
//         )
//       }
//     </div>
//   );
// };
