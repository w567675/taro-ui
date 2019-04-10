import { BaseEvent } from '@tarojs/components/types/common'

import Calendar from '../types'

export interface Props {
  generateDate: Calendar.DateArg

  minDate?: Calendar.DateArg

  maxDate?: Calendar.DateArg

  hideArrow: boolean

  hideTime: boolean;

  monthFormat: string
  timeFormat: string
  renderExtra?: JSX.Element;

  onPreMonth: () => void

  onNextMonth: () => void

  onSelectDate: (e: BaseEvent) => void

  onSelectTime: (e: BaseEvent) => void
}

export interface State {}
