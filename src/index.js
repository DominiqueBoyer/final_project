const { HashRouter, Link, NavLink, Route, Switch } = ReactRouterDOM;
      const { createStore, combineReducers } = Redux;
      const { Provider, connect } = ReactRedux;


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

      const store = createStore(reducer);

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

      const _Nav = ({ students, schools })=>{

        return (
          <nav>
            <h1> Acme Schools</h1>
            <NavLink to='/schools'>Schools({schools.length})</NavLink>
            <NavLink to='/students'>Students({students.length})</NavLink>
            <NavLink to='/schools/:id'>Most Popular ???()</NavLink>
            <NavLink to='/schools/:id'>Top School ???()</NavLink>
          </nav>
        );
      };

      const Nav = connect((state)=>{
        return ({
          students: state.students,
          schools: state.schools
        });
      })(_Nav)

      class Form extends React.Component{
        constructor(){
          super();
          this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gpa:'',
            school: '',
            error:''
          };
        }
        render(){
          const { firstName, lastName, email, gpa, school, error } = this.state;
          return (
            <div className='form'>
              First Name <input value={firstName} onChange={(ev) => this.setState({ firstName: ev.target.value})}/>
              Last Name <input value={lastName} onChange={(ev) => this.setState({ lastName: ev.target.value})}/>
              Email <input type="email" value={email} onChange={(ev) => this.setState({ email: ev.target.value})}/>
              GPA <input value={gpa} onChange={(ev) => this.setState({ gpa: ev.target.value})}/>
              Enroll at <input value={school} placeholder='Add School'onChange={(ev) => this.setState({school: ev.target.value})} />
              <button>Save</button>
            </div>
          );
        }
      }

      const Home = ()=> {
        return (
          <div>
            <h1>Home</h1>
            <p>Our most popular school is ... with ??? students.</p>
            <p>Our top performing school is ... with an average GPA of ???</p>
          </div>
        );
      };

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
                <Route component={ Form } />
                <Route exact path='/' component={Home} />
                <Route path='/schools' component={School} />
                <Route path='/students' component={Students} />
              </HashRouter>
            </Provider>
          );
        }
      } //app end bracket

      ReactDOM.render(<App />, document.querySelector('#root'));
