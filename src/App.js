import React from 'react';
import Nav from './Nav';
import CreateStudent from './CreateStudent';
import Routes from './Route'

class App extends React.Component{
  render(){
    return (
      <div>
        <Nav />
        <CreateStudent />
        <Routes />
      </div>
    )
  }
}
export default App;
