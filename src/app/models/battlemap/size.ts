import { BtBase } from '../common/base'

export class BattlemapSize extends BtBase {
  width: number
  height: number
  name: string

  getProto() {
    return {
      width: 0,
      height: 0,
      name: null,
    }
  }
}
