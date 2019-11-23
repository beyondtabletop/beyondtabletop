import { BtBase } from './base'
import { BtConditionEffect } from './condition-effect'

export class BtCondition extends BtBase {
  pos: number
  name: string
  description: string
  active: boolean
  source: string
  effects: BtConditionEffect[]

  getProto() {
    return {
      pos: 0,
      name: '',
      description: null,
      active: false,
      source: 'user',
      effects: [],
    }
  }
  getLookup() {
    return {
      effects: BtConditionEffect
    }
  }
}
