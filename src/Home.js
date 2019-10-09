import React from 'react';
import { Provider, connect } from 'react-redux';

// might need to be a class

const _Home = ({ schools, students})=> {
  const _schools = schools.map(school => {
    const studentsAttending = students.filter(student => student.schoolId === school.id)
    return {...school, studentsAttending}
  });
  console.log(_schools)
  const mostPop = _schools.map(school => school.studentsAttending);
  console.log(mostPop)
  return (
    <div>
      <h1>Home page</h1>
      <p>Our most popular school is ... with ??? students.</p>
      <p>Our top performing school is ... with an average GPA of ???</p>
    </div>
  );
};

const Home = connect ((state)=>{
  return ({
    schools: state.schools,
    students: state.students
  });
})(_Home)

export default Home
