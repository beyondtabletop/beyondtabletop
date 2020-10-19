import { BtBase } from '../common/base'
import { RpgConditionEffect } from './condition-effect'

export class RpgCondition extends BtBase {
  pos: number
  name: string
  description: string
  active: boolean
  effects: RpgConditionEffect[]

  getProto() {
    return {
      pos: 0,
      name: '',
      description: null,
      active: false,
      effects: []
    }
  }

  getLookup() {
    return {
      effects: RpgConditionEffect
    }
  }
}
