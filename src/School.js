import React from 'react';
import { connect } from 'react-redux';
import { getSchoolsThunk, getStudentsThunk, updateStudentThunk, deleteStudentThunk } from './store';


class _School extends React.Component{
  constructor(props){
    super();
    this.deleteStudent = this.deleteStudent.bind(this);
    // this.updateStudent = this.updateStudent.bind(this);
  }
  async componentDidMount(){
    // const id = this.props.match.params.id
    await this.props.getSchools()
    await this.props.getStudents()
  }
  async deleteStudent(id){
    await this.props.deleteStudent(id)
  }
  // async updateStudent(){
  //   await this.props.updateStudent()
  // }
  render(){
    const id = this.props.match.params.id
    const {schools, students} = this.props;
    const _schools = schools.map(school => {
      const studentsAttending = students.filter(student => student.schoolId === school.id)
      return {...school, studentsAttending}
    });
    return (
      <div>
        {
          _schools.map(school => school.id=== id ? (<div key={school.id}>
              <h2>{school.name} ( { school.studentsAttending.length } Students Enrolled)</h2>
              <select >
                <option>Add Student</option>
                {
                  students.map(student => student.schoolId !== school.id ? <option key={ student.id} value={student.id}>{student.firstName} {student.lastName} </option> : '')
                }
              </select >
              <div className='students'>
                {
                  students.map(student => student.schoolId === school.id ? (<li key={student.id}>
                    <div> {student.firstName} {student.lastName} </div>
                    <div> GPA {student.GPA} </div>
                    <div> Enrolled at {student.schoolId === null ? 'nowhere' : 'somewhere' }</div>
                    <select onChange={(ev)=> this.updateStudent({id: student.id, schoolId: ev.target.value})}>
                      <option selected={student.schoolId===null}>Not Enrolled</option>
                      {
                        schools.map(school => (
                          <option key={school.id} value={school.id} selected={student.schoolId===school.id}>{school.name}</option>
                        ))
                      }
                    </select>
                    <br/>
                    <button onClick={ () => this.deleteStudent(student.id) }>Delete Student</button>
                  </li>) : '')
                }
              </div>
            </div>) : '')
        }
      </div>




    );
  }
}

// const _School = ({ id, students, schools }) => {
//   console.log(id, schools)
//   const school = schools.filter( school => school.id === id)
//   console.log(school)
//   return(
//     <div>
//       <h1> hello {school[0].name}</h1>
//     </div>
//   );
// }



const mapStateToProps = (state)=> {
  return {
    schools: state.schools,
    students: state.students
  };
}

const dispatchToProps = {
  getSchools: getSchoolsThunk,
  getStudents: getStudentsThunk,
  deleteStudent: deleteStudentThunk

};

const School = connect(mapStateToProps, dispatchToProps)(_School)

export default School;
