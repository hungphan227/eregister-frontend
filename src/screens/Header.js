import React from 'react'
import { Logout32 } from '@carbon/icons-react';
import service from '../service/Service';
import { history } from '../routes/Routes'
import { SCREEN_NAMES } from '../constants/Constants';

class Header extends React.Component {

  handleClickEregisterLogo = () => {
    history.push(SCREEN_NAMES.SCREEN_COURSE_REGISTRATION)
  }

  handleClickMyCourses = () => {
    history.push(SCREEN_NAMES.SCREEN_MY_COURSES)
  }
    
  handleClickLogout = () => {
    service.logout();
  }

  render() {
    return(
      <div className='header'>
        <img src='images/eregister.png' alt='logo' className='header-logo' onClick={this.handleClickEregisterLogo} />
        <div className='header-button-list'>
          <div className='header-button' onClick={this.handleClickMyCourses} >My Lessons</div>
          <div className='header-button'>Find Teacher</div>
          <div className='header-button'>Messages</div>
          <div className='header-button'>Settings</div>
        </div>
        <Logout32 className='header-logout' onClick={this.handleClickLogout} />
      </div>
    )
  }
}

export default Header