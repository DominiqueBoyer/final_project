import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import School from './School';
import Students from './Students';
class Routes extends React.Component{
  render (){
    return(
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/schools' component={School} />
        <Route path='/students' component={Students} />
      </Switch>
    )}
}

export default Routes;
