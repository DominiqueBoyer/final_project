import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


const _Nav = ({ students, schools })=>{
  const _schools = schools.map(school => {
    const studentsAttending = students.filter(student => student.schoolId === school.id)
    return {...school, studentsAttending}
  });
  const studentCount = _schools.map(school => school.studentsAttending.length).reduce((max, cur)=> cur >= max ? max= cur : max=max, 0);
  console.log(studentCount)
  const mostPopular = _schools.filter(school => school.studentsAttending.length === studentCount)

  return (
    <nav>
      <h1> Acme Schools</h1>
      <NavLink to='/schools'>Schools({schools.length})</NavLink>
      <NavLink to='/students'>Students({students.length})</NavLink>
      <NavLink to={`/schools/${mostPopular}`}>Most Popular ()</NavLink>
      <NavLink to='/schools/:id'>Top School ()</NavLink>
    </nav>
  );
};
const Nav = connect((state)=>{
  return ({
    students: state.students,
    schools: state.schools
  });
})(_Nav)

export default Nav;
