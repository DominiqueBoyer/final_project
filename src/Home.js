import React from 'react';
import { Provider, connect } from 'react-redux';

// might need to be a class

const _Home = ({ schools, students})=> {
  const _schools = schools.map(school => {
    const studentsAttending = students.filter(student => student.schoolId === school.id)
    return {...school, studentsAttending}
  });
  console.log(_schools)
  const studentCount = _schools.map(school => school.studentsAttending.length).reduce((max, cur)=> cur >= max ? max= cur : max=max, 0);
  console.log(studentCount)
  const mostPopular = _schools.filter(school => school.studentsAttending.length === studentCount)
  console.log(mostPopular[0])
  return (
    <div>
      <h1>Home page</h1>
      <p>Our most popular school is {mostPopular[0].name} with {mostPopular[0].studentsAttending.length} students.</p>
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
