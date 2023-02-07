import React from 'react'
import Button from '../Button';
import { Close32 } from '@carbon/icons-react'
import './ConfirmPopup.scss'

class ConfirmPopup extends React.Component {

  static popup

  constructor(props) {
    super(props)
    ConfirmPopup.popup = this;

    this.state = {
      show: false,
      data: {}
    }
  }

  static show(data) {
    ConfirmPopup.popup.setState({ show: true, data: data })
  }

  handleClickClose = () => {
    this.setState({ show: false })
  }

  handleClickConfirm = (handleClickButton) => {
    handleClickButton()
    this.setState({ show: false })
  }

  render() {
    let data = this.state.data

    if (!this.state.show) {
      return (<div></div>)
    }

    return (
      <div className='confirm-popup'>
        <div className='popup-background'></div>
        <div className='popup-main'>
          <div className='popup-main-header'>
            <Close32 className='close-button' onClick={this.handleClickClose} />
          </div>
          <div className='popup-main-body'>
            {data.content}
          </div>
          <div className='popup-main-footer'>
            <Button name='Yes' handleClick={() => { this.handleClickConfirm(data.handleClickButton) }} />
            <Button name='No' handleClick={() => { this.handleClickClose() }} />
          </div>
        </div>
      </div>
    )
  }
}

export default ConfirmPopup