/* eslint-disable taro/function-naming */
import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'

import AtComponent from '../../common/component'
import { handleTouchScroll } from '../../common/utils'

export default class AtFloatLayout extends AtComponent {
  constructor (props) {
    super(...arguments)

    const { isOpened } = props
    this.state = {
      _isOpened: isOpened
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isOpened } = nextProps

    if (this.props.isOpened !== isOpened) {
      handleTouchScroll(isOpened)
    }

    if (isOpened !== this.state._isOpened) {
      this.setState({
        _isOpened: isOpened
      })
    }
  }

  handleClose = () => {
    if (_isFunction(this.props.onClose)) {
      this.props.onClose()
    }
  }

  close = () => {
    this.setState(
      {
        _isOpened: false
      },
      this.handleClose
    )
  }

  handleTouchMove = e => {
    e.stopPropagation()
  }
  handleOk = e => {
    if (_isFunction(this.props.onOk)) {
      this.props.onOk()
      this.close()
    }
  }

  render () {
    const { _isOpened } = this.state
    const {
      title,

      scrollY,
      scrollX,
      scrollTop,
      scrollLeft,
      upperThreshold,
      lowerThreshold,
      scrollWithAnimation,
      cancelText,
      okText,
    } = this.props

    const rootClass = classNames(
      'at-float-layout',
      {
        'at-float-layout--active': _isOpened
      },
      this.props.className
    )
    console.log(title)
    return (
      <View className={rootClass} onTouchMove={this.handleTouchMove}>
        <View onClick={this.close} className='at-float-layout__overlay' />
        <View className='at-float-layout__container layout'>
          {(title === '' || title) ? (
            <View className='layout-header'>
              <View className='layout-header__cancel' onClick={this.close} >{cancelText || ''}</View>
              <View className='layout-header__title'>{title}</View>
              <View className='layout-header__ok' onClick={this.handleOk}>{okText || ''}</View>
              {/* <View className='layout-header__btn-close' onClick={this.close} /> */}
            </View>
          ) : null}
          <View className='layout-body'>
            <ScrollView
              scrollY={scrollY}
              scrollX={scrollX}
              scrollTop={scrollTop}
              scrollLeft={scrollLeft}
              upperThreshold={upperThreshold}
              lowerThreshold={lowerThreshold}
              scrollWithAnimation={scrollWithAnimation}
              onScroll={this.props.onScroll}
              onScrollToLower={this.props.onScrollToLower}
              onScrollToUpper={this.props.onScrollToUpper}
              className='layout-body__content'
            >
              {this.props.children}
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}

AtFloatLayout.defaultProps = {
  isOpened: false,

  scrollY: true,
  scrollX: false,
  scrollWithAnimation: false,

  onClose: () => {},
  onOk: () => {},
  onScroll: () => {},
  onScrollToLower: () => {},
  onScrollToUpper: () => {}
}

AtFloatLayout.propType = {
  title: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  isOpened: PropTypes.bool,
  scrollY: PropTypes.bool,
  scrollX: PropTypes.bool,
  scrollTop: PropTypes.number,
  scrollLeft: PropTypes.number,
  upperThreshold: PropTypes.number,
  lowerThreshold: PropTypes.number,
  scrollWithAnimation: PropTypes.bool,
  onClose: PropTypes.func,
  onOk: PropTypes.func,
  onScroll: PropTypes.func,
  onScrollToLower: PropTypes.func,
  onScrollToUpper: PropTypes.func
}
