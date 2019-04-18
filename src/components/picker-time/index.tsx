import classnames from 'classnames';
import Taro from '@tarojs/taro'
import { View, PickerView, PickerViewColumn } from '@tarojs/components'
import { array } from 'prop-types';

export  interface AtPickerTimeProps {
  timeStep: number;
}

type AtPickerTimeState = {

}

const defaultProps: Partial<AtPickerTimeProps> = {
  timeStep : 15
}

export default class AtPickerTime extends Taro.Component<AtPickerTimeProps, AtPickerTimeState> {
  static options = { addGlobalClass: true }
  static defaultProps = defaultProps

  private hours : string[] = [];
  private times : string[] = [];
  constructor(props) {
    super(props);
    this.init()
  }
  init() {
    this.hours = Array(24).fill(null).map((_, h) => h < 10 ? '0' + (h + 1) : '' + (h + 1));
    this.times = [];
    for(let i = 1 ; i <= 60 ; i+= this.props.timeStep) {
      this.times.push(i < 10 ? '0' + i : '' + i);
    }
  }
  render() {
    return <View>23232</View>
  }
}