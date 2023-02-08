import React from 'react'
import Button from '../Button'
import './EmptyInformationCard.scss'

class EmptyInformationCard extends React.Component {

  static defaultProps = {
    data: {},
    showRemainingSpots: true
  }

  render() {
    let { data, buttonName, handleClickButton, showRemainingSpots } = this.props;
    return (
      <div className='empty-information-card'>
        The list is empty
      </div>
    )
  }
}

export default EmptyInformationCard