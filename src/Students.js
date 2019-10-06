import React from 'react';
import { Provider, connect } from 'react-redux';

const _Students = ({ students })=>{
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
            <button>Delete Student</button>
          </li>
        )
      }
    </div>
  );
};
const Students = connect((state)=>{
  return ({
    students: state.students
  });
})(_Students)

export default Students;
