import React from 'react';
import { Provider, connect } from 'react-redux';

const _School = ({ schools, students })=>{
  return (
    <div className='schools'>
      {
        schools.map( school => <li key={school.id}>
          <div>{ school.name } </div>
          <div>School count</div>
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
};
const School = connect((state)=>{
  return ({
    schools: state.schools,
    students: state.students
  });
})(_School)

export default School;
