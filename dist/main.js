/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const {\n  HashRouter,\n  Link,\n  NavLink,\n  Route,\n  Switch\n} = ReactRouterDOM;\nconst {\n  createStore,\n  combineReducers\n} = Redux;\nconst {\n  Provider,\n  connect\n} = ReactRedux;\nconst reducer = combineReducers({\n  students: (state = [], action) => {\n    if (action.type === 'GET_STUDENTS') {\n      state = action.students;\n    }\n\n    return state;\n  },\n  schools: (state = [], action) => {\n    if (action.type === 'GET_SCHOOLS') {\n      state = action.schools;\n    }\n\n    return state;\n  }\n});\nconst store = createStore(reducer);\n\nconst getStudents = async () => {\n  store.dispatch({\n    type: 'GET_STUDENTS',\n    students: (await axios.get('/api/students')).data\n  });\n};\n\nconst getSchools = async () => {\n  store.dispatch({\n    type: 'GET_SCHOOLS',\n    schools: (await axios.get('/api/schools')).data\n  });\n};\n\nconst _Nav = ({\n  students,\n  schools\n}) => {\n  return React.createElement(\"nav\", null, React.createElement(\"h1\", null, \" Acme Schools\"), React.createElement(NavLink, {\n    to: \"/schools\"\n  }, \"Schools(\", schools.length, \")\"), React.createElement(NavLink, {\n    to: \"/students\"\n  }, \"Students(\", students.length, \")\"), React.createElement(NavLink, {\n    to: \"/schools/:id\"\n  }, \"Most Popular ???()\"), React.createElement(NavLink, {\n    to: \"/schools/:id\"\n  }, \"Top School ???()\"));\n};\n\nconst Nav = connect(state => {\n  return {\n    students: state.students,\n    schools: state.schools\n  };\n})(_Nav);\n\nclass Form extends React.Component {\n  constructor() {\n    super();\n    this.state = {\n      firstName: '',\n      lastName: '',\n      email: '',\n      gpa: '',\n      school: '',\n      error: ''\n    };\n  }\n\n  render() {\n    const {\n      firstName,\n      lastName,\n      email,\n      gpa,\n      school,\n      error\n    } = this.state;\n    return React.createElement(\"div\", {\n      className: \"form\"\n    }, \"First Name \", React.createElement(\"input\", {\n      value: firstName,\n      onChange: ev => this.setState({\n        firstName: ev.target.value\n      })\n    }), \"Last Name \", React.createElement(\"input\", {\n      value: lastName,\n      onChange: ev => this.setState({\n        lastName: ev.target.value\n      })\n    }), \"Email \", React.createElement(\"input\", {\n      type: \"email\",\n      value: email,\n      onChange: ev => this.setState({\n        email: ev.target.value\n      })\n    }), \"GPA \", React.createElement(\"input\", {\n      value: gpa,\n      onChange: ev => this.setState({\n        gpa: ev.target.value\n      })\n    }), \"Enroll at \", React.createElement(\"input\", {\n      value: school,\n      placeholder: \"Add School\",\n      onChange: ev => this.setState({\n        school: ev.target.value\n      })\n    }), React.createElement(\"button\", null, \"Save\"));\n  }\n\n}\n\nconst Home = () => {\n  return React.createElement(\"div\", null, React.createElement(\"h1\", null, \"Home\"), React.createElement(\"p\", null, \"Our most popular school is ... with ??? students.\"), React.createElement(\"p\", null, \"Our top performing school is ... with an average GPA of ???\"));\n};\n\nconst _School = ({\n  schools,\n  students\n}) => {\n  return React.createElement(\"div\", {\n    className: \"schools\"\n  }, schools.map(school => React.createElement(\"li\", {\n    key: school.id\n  }, React.createElement(\"div\", null, school.name, \" \"), React.createElement(\"div\", null, \"School count\"), React.createElement(\"select\", null, React.createElement(\"option\", null, \"Add Student\"), students.map(student => React.createElement(\"option\", {\n    key: student.id\n  }, student.firstName))))));\n};\n\nconst School = connect(state => {\n  return {\n    schools: state.schools,\n    students: state.students\n  };\n})(_School);\n\nconst _Students = ({\n  students\n}) => {\n  return React.createElement(\"div\", {\n    className: \"students\"\n  }, students.map(student => React.createElement(\"li\", {\n    key: student.id\n  }, React.createElement(\"div\", null, \" \", student.firstName, \" \", student.lastName, \" \"), React.createElement(\"div\", null, \" GPA \", student.GPA, \" \"), React.createElement(\"select\", null, React.createElement(\"option\", null, \"Not Enrolled\"), React.createElement(\"option\", null, \"Brown\"), React.createElement(\"option\", null, \"MIT\"), React.createElement(\"option\", null, \"Cal Poly SLO\"), React.createElement(\"option\", null, \"Harvard\"), React.createElement(\"option\", null, \"CCNY\")), React.createElement(\"br\", null), React.createElement(\"button\", null, \"Delete Student\"))));\n};\n\nconst Students = connect(state => {\n  return {\n    students: state.students\n  };\n})(_Students);\n\nclass App extends React.Component {\n  componentDidMount() {\n    getStudents();\n    getSchools();\n  }\n\n  render() {\n    return React.createElement(Provider, {\n      store: store\n    }, React.createElement(HashRouter, null, React.createElement(Route, {\n      component: Nav\n    }), React.createElement(Route, {\n      component: Form\n    }), React.createElement(Route, {\n      exact: true,\n      path: \"/\",\n      component: Home\n    }), React.createElement(Route, {\n      path: \"/schools\",\n      component: School\n    }), React.createElement(Route, {\n      path: \"/students\",\n      component: Students\n    })));\n  }\n\n} //app end bracket\n\n\nReactDOM.render(React.createElement(App, null), document.querySelector('#root'));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });