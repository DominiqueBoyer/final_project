import React from 'react';
import { connect } from 'react-redux';
import { getSchoolsThunk, getStudentsThunk, updateStudentThunk } from './store';
import { Link } from 'react-router-dom';

class _Schools extends React.Component{
  constructor(){
    super();
    this.updateStudent = this.updateStudent.bind(this);
  }
  async componentDidMount(){
    await this.props.getSchools()
    await this.props.getStudents()
  }
  async updateStudent(id, schoolId){
    await this.props.updateStudent(id, schoolId);
  }
  render(){
    const { schools, students } = this.props;
    const _schools = schools.map(school => {
      const studentsAttending = students.filter(student => student.schoolId === school.id)
      return {...school, studentsAttending}
    });
    // console.log(_schools);
    // console.log(students);
    return (
      <div className='schools'>
        {
          _schools.map( school => <li key={school.id} >
            <Link to={`/schools/${school.id}`}>{ school.name } </Link>
            <div>School count {school.studentsAttending.length}</div>
            <select onChange={(ev)=> {

              this.updateStudent( ev.target.value, school.id)}
            }>
              <option>Add Student</option>
              {
                students.map(student => student.schoolId === null ? <option key={ student.id} value={student.id}>{student.firstName}</option> : '')
              }
            </select >
            </li>
          )
        }
      </div>
    );
  }
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
  updateStudent: updateStudentThunk
};
const Schools = connect(mapStateToProps, dispatchToProps)(_Schools)

export default Schools;


// const _School = ({ schools, students })=>{
//   return (
//     <div className='schools'>
//       {
//         schools.map( school => <li key={school.id}>
//           <div>{ school.name } </div>
//           <div>School count</div>
//           <select>
//             <option>Add Student</option>
//             {
//               students.map(student => <option key={student.id}>{student.firstName}</option>)
//             }
//           </select>
//           </li>
//         )
//       }
//     </div>
//   );
// };
