import { BtBase } from '../common/base'

export class BattlemapPosition extends BtBase {
  top: number
  left: number

  getProto() {
    return {
      top: 0,
      left: 0,
    }
  }
}
