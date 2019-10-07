import React from 'react';
import { connect } from 'react-redux';
import { getSchoolsThunk, getStudentsThunk } from './store';
import { Link } from 'react-router-dom';

class _School extends React.Component{
  constructor(){
    super();
  }
  async componentDidMount(){
    await this.props.getSchools()
    await this.props.getStudents()
  }
  render(){
    const { schools, students } = this.props;
    const _schools = schools.map(school => {
      const studentsAttending = students.filter(student => student.schoolId === school.id)
      return {...school, studentsAttending}
    })
    console.log(_schools);
    return (
      <div className='schools'>
        {
          _schools.map( school => <li key={school.id}>
            <Link to='/schools/:id'>{ school.name } </Link>
            <div>School count {school.studentsAttending.length}</div>
            <select>
              <option>Add Student</option>
              {
                students.map(student => <option key={student.id}>{student.firstName}</option>)
              }
            </select>
            </li>
          )
        }
      </div>
    );
  }
}

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

const mapStateToProps = (state)=> {
  return {
    schools: state.schools,
    students: state.students
  };
}

const dispatchToProps = {
  getSchools: getSchoolsThunk,
  getStudents: getStudentsThunk
};
const School = connect(mapStateToProps, dispatchToProps)(_School)

export default School;
