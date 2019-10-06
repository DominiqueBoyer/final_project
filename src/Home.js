import React from 'react';
import { Provider, connect } from 'react-redux';


const _Home = ()=> {
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
