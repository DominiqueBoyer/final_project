import React from 'react';
import { connect } from 'react-redux';
import { getSchoolsThunk, getStudentsThunk, updateStudentThunk } from './store';


class _School extends React.Component{
  constructor(props){
    super();
    // this.updateStudent = this.updateStudent.bind(this);
  }
  async componentDidMount(){
    // const id = this.props.match.params.id
    await this.props.getSchools()
  }
  // async updateStudent(){
  //   await this.props.updateStudent()
  // }
  render(){
    const id = this.props.match.params.id
    const {schools} = this.props;
    const school = schools.filter( school => school.id === id)
    console.log(schools)
    return (
      <div>
        {
          schools.map(school => school.id=== id ? (<div key={school.id}>
              <h1>{school.name} (Students Enrolled)</h1>
              <button>Add Student</button>
              <div>
                Students:
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

};

const School = connect(mapStateToProps, dispatchToProps)(_School)

export default School;
