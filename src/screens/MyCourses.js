import React from 'react'
import Header from './Header'
import InformationCard from '../components/InformationCard'
import EmptyInformationCard from '../components/EmptyInformationCard'
import Notification from '../components/Notification/Notification'
import ConfirmPopup from '../components/ConfirmPopup'
import service from '../service/Service'
import internalEventBus from '../InternalEventBus'
import { INTERNAL_EVENTS } from '../constants/Constants'

class MyCourses extends React.Component {

  getCourseEventHandler

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      showPopup: false,
      popupContent: ''
    }
  }

  componentDidMount() {
    this.getCourseEventHandler = (event) => {
      console.log("react event " + INTERNAL_EVENTS.GET_COURSE)
      let message = event.detail
      let courseId = message
      service.getCourse(courseId, (data) => {
        // TODO - Optimize rerender
        let course = data
        let courses = [...this.state.courses]
        let index = courses.findIndex(c => c.courseNumber === course.courseNumber)
        courses[index] = course
        this.setState({ courses: courses });
      })
    }
    internalEventBus.on(INTERNAL_EVENTS.GET_COURSE, this.getCourseEventHandler)

    this.getCoursesOfStudent()
  }

  componentWillUnmount() {
    internalEventBus.remove(INTERNAL_EVENTS.GET_COURSE, this.getCourseEventHandler)
  }

  getCoursesOfStudent = () => {
    service.getCoursesOfStudent((data) => {
      this.setState({ courses: data })
    })
  }

  handleClickCancel(course) {
    let data = {}
    data.handleClickButton = () => {
      service.cancelCourse(course.id, (data) => {
        Notification.show(data.message, 'success')
        this.getCoursesOfStudent()
      }, (data) => {
        Notification.show(data.message, 'error')
      })
    }
    data.content = "Are you sure?"
    ConfirmPopup.show(data)
  }

  render() {
    return (
      <div>
        <Header></Header>
        <div className='eregister-body'>
          {this.renderInformationCards()}
        </div>
      </div>
    )
  }

  renderInformationCards() {
    if (this.state.courses.length === 0) return <EmptyInformationCard></EmptyInformationCard>
    return (
      <div>
        {
          this.state.courses.map((course, idx) => {
            return (
              <InformationCard data={course} showRemainingSpots={false} buttonName="Cancel" handleClickButton={() => this.handleClickCancel(course)} key={idx} />
            )
          })
        }
      </div>
    )
  }

}

export default MyCourses