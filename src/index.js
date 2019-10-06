import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { HashRouter, Link, NavLink, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import School from './School';
import Students from './Students';
import Home from './Home';
import CreateStudent from './Students'





const reducer = combineReducers({
  students: (state =[], action ) => {
    if(action.type === 'GET_STUDENTS'){
      state = action.students
    }
    if(action.type === 'CREATE_STUDENT'){
      state = [...state, action.student]
    }
    if(action.type === 'DELETE_STUDENT'){
      state = state.filter(student => student.id !== action.student.id)
    }
    return state;
  },
  schools: (state =[], action ) => {
    if(action.type === 'GET_SCHOOLS'){
      state = action.schools
    }
    return state;
  }
});

const getSchools = async()=> {
  store.dispatch({
    type: 'GET_SCHOOLS',
    schools: (await axios.get('/api/schools')).data
  })
};

const getStudents = async()=> {
  store.dispatch({
    type: 'GET_STUDENTS',
    students: (await axios.get('/api/students')).data
  })
};
const createStudent = (student)=> {
  return async (dispatch) => {
    const created = (await axios.post('/api/students', student)).data;
    return dispatch({ type: 'CREATE_STUDENT', student }(created))
  }
};
const deleteStudent = (student) => {
  return async (dispatch) => {
    await axios.delete('/api/students/')
  }
}


const store = createStore(reducer);












class App extends React.Component{
  componentDidMount(){
    getStudents();
    getSchools();
  }
  render(){
    return (
      <Provider store={ store }>
        <HashRouter>
          <Route component={ Nav } />
          <Route component={ CreateStudent } />
          <Route exact path='/' component={Home} />
          <Route path='/schools' component={School} />
          <Route path='/students' component={Students} />
        </HashRouter>
      </Provider>
    );
  }
} //app end bracket

ReactDOM.render(<App />, document.querySelector('#root'));
