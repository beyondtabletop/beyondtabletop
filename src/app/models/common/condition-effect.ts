import { BtBase } from './base'

export class BtConditionEffect extends BtBase {
  pos: number
  name: string
  formula: string
  valid: boolean
  value: number

  getProto() {
    return {
      pos: 0,
      name: 'STR',
      formula: '',
      valid: true,
      value: 0,
    }
  }
}
