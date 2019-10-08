import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios'

// action type
const GET_STUDENTS = 'GET_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const GET_SCHOOLS = 'GET_SCHOOLS';

// action creater
const getSchools = (schools) => ({ type: GET_SCHOOLS, schools})
const getStudents = (students)=> ({type: GET_STUDENTS, students})
const createStudent = (student) => ({ type: CREATE_STUDENT, student})
const deleteStudent = (id) => ({ type: DELETE_STUDENT, id })
const updateStudent = (id) => ({ type: UPDATE_STUDENT, id })

const getSchoolsThunk = () => {
  return async dispatch=> {
    const schools = (await axios.get('/api/schools')).data
    dispatch(getSchools(schools))
  }
}
const getStudentsThunk = ()=> {
  return async dispatch=>{
   const students = ( await axios.get('/api/students')).data
   dispatch(getStudents(students))
  }
}
 const createStudentThunk = (payload)=> async dispatch => {
   const student = ( await axios.post('/api/students', payload )).data
   dispatch(createStudent(student))
 }

 const deleteStudentThunk = (id) => async dispatch => {
   await axios.delete(`/api/students/${id}`);
   dispatch(deleteStudent(id));
 }
 const updateStudentThunk = (id, schoolId)=> async dispatch => {
   const updated = (await axios.put(`/api/students/${id}`, { schoolId } )).data
   dispatch(updateStudent(updated));
 }


const reducer = combineReducers({
  students: (state =[], action ) => {
    if(action.type === GET_STUDENTS){
      state = action.students
    }
    if(action.type === CREATE_STUDENT){
      state = [...state, action.student ]
    }
    if(action.type === DELETE_STUDENT){
      state = state.filter( student => student.id !== action.id)
    }
    if(action.type === UPDATE_STUDENT){
      state = state.map(student => student.id === action.student.id ? action.student : student )
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

// const getStudents = async()=> {
//   store.dispatch({
//     type: 'GET_STUDENTS',
//     students: (await axios.get('/api/students')).data
//   })
// };
// const getSchools = async()=> {
//   store.dispatch({
//     type: 'GET_SCHOOLS',
//     schools: (await axios.get('/api/schools')).data
//   })
// };

const store = createStore(reducer, applyMiddleware(thunkMiddleware));



export default store;
export { getStudentsThunk, createStudentThunk, deleteStudentThunk, updateStudentThunk, getSchoolsThunk };
