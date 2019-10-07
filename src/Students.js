import React from 'react';
import { Provider, connect } from 'react-redux';
import { deleteStudentThunk, getStudentsThunk } from './store';

class _Students extends React.Component{
  constructor(){
    super();
    this.deleteStudent = this.deleteStudent.bind(this);
  }
  async componentDidMount(){
    await this.props.getStudents()
  }
  async deleteStudent(id){
    await this.props.deleteStudent(id)
  }
  render(){
    const {students} = this.props;
    // console.log(this.props.students)
    return (
      <div className='students'>
        {
          students.map( student =>
            <li key={student.id}>
              <div> {student.firstName} {student.lastName} </div>
              <div> GPA {student.GPA} </div>
              <select>
                <option>Not Enrolled</option>
                <option>Brown</option>
                <option>MIT</option>
                <option>Cal Poly SLO</option>
                <option>Harvard</option>
                <option>CCNY</option>
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



const mapStateToProps = (state)=>{
  return {
    students: state.students
  };
}

//this works even if iam pasing something into the function
const dispatchToProps = {
  getStudents: getStudentsThunk,
  deleteStudent: deleteStudentThunk
}
//if im not using state but using dispatch must pass in null value to state
const Students = connect(mapStateToProps, dispatchToProps)(_Students)

export default Students;
