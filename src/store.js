import { createStore, combineReducers } from 'redux';

const reducer = combineReducers({
  students: (state =[], action ) => {
    if(action.type === 'GET_STUDENTS'){
      state = action.students
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

const getStudents = async()=> {
  store.dispatch({
    type: 'GET_STUDENTS',
    students: (await axios.get('/api/students')).data
  })
};
const getSchools = async()=> {
  store.dispatch({
    type: 'GET_SCHOOLS',
    schools: (await axios.get('/api/schools')).data
  })
};

const store = createStore(reducer);



export default store;
export { getStudents, getSchools, createStudent };
