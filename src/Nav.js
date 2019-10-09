import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


const _Nav = ({ students, schools })=>{

  return (
    <nav>
      <h1> Acme Schools</h1>
      <NavLink to='/schools'>Schools({schools.length})</NavLink>
      <NavLink to='/students'>Students({students.length})</NavLink>
      <NavLink to='/schools/mostpopular'>Most Popular ()</NavLink>
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
