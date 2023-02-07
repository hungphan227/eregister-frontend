import React from 'react'
import Button from '../Button'
import './InformationCard.scss'
import computerScience from '../../assets/images/computer-science.png'

class InformationCard extends React.Component {

  static defaultProps = {
    data: {},
    showRemainingSpots: true
  }

  render() {
    let { data, buttonName, handleClickButton, showRemainingSpots } = this.props;
    return (
      <div className='information-card'>
        <div className='first-column'>
          <img src={computerScience} className='image' alt='course icon'></img>
          <div>
            <Button name={buttonName} handleClick={handleClickButton} />
          </div>
        </div>
        <div className='second-column'>
          <div className='courseName'>{data.courseName}</div>
          <div className='teacher'>{data.teacher}</div>
          <div className='teacher space'>Limit</div>
          <div className='limit'>{data.limit}</div>
          {showRemainingSpots?
            <>
              <div className='teacher'>Remaining Spots</div>
              <div className='limit'>{data.remainingSlots}</div>
            </>
          :<></>}
        </div>
        <div className='third-column'>
          <div className='intro-title'>Intro</div>
          <div className='intro-content'>{data.description}</div>
        </div>
      </div>
    )
  }
}

export default InformationCard