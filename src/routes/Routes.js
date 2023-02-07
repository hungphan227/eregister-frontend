import React from 'react'
import Login from '../screens/Login'
import CourseRegistration from '../screens/CourseRegistration'
import MyCourses from '../screens/MyCourses'
import { Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history";
import { SCREEN_NAMES } from '../constants/Constants'

// export const history = createBrowserHistory({basename: '/pts'});
export const history = createBrowserHistory();

class Routes extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={SCREEN_NAMES.SCREEN_LOGIN} component={Login} />
          <Route exact path={SCREEN_NAMES.SCREEN_COURSE_REGISTRATION} component={CourseRegistration} />
          <Route exact path={SCREEN_NAMES.SCREEN_MY_COURSES} component={MyCourses} />
        </Switch>
      </Router>
    )
  }
}

export default Routes