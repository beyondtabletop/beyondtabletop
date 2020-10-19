import { BtBase } from '../common/base'

export class RpgCalculation extends BtBase {
  pos: number
  name: string
  formula: string
  rolls: boolean
  valid: boolean

  getProto() {
    return {
      name: null,
      formula: null,
      rolls: false,
      valid: true,
      // phrase: null,
      // invisible: false,
    }
  }
}
