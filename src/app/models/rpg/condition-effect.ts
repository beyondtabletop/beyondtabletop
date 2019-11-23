import { BtBase } from '../common/base'

export class RpgConditionEffect extends BtBase {
  pos: number
  stat: string
  formula: string
  valid: boolean
  value: number

  getProto() {
    return {
      pos: 0,
      stat: null,
      formula: null,
      valid: true,
      value: 0,
    }
  }
}
