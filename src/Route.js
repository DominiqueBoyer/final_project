import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Schools from './Schools';
import School from './School';
import Students from './Students';
import MostPopular from './MostPopular';
class Routes extends React.Component{
  render (){
    return(
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/schools' component={Schools} />
        <Route path='/schools/:id' render={(props) => <School {...props} />} />
        <Route path='/schools/mostpopular' render={(props) => <MostPopular {...props} />} />
        <Route path='/students' component={Students} />
      </Switch>
    )}
}

export default Routes;
