import { BtBase } from '../common/base'
import { BattlemapPosition } from './position'

export class BattlemapLayer extends BtBase {
  name: string
  fog: boolean
  pinned: boolean
  position: BattlemapPosition

  getProto() {
    return {
      name: '1',
      fog: false,
      pinned: false,
      position: new BattlemapPosition({
        top: 0,
        left: 0,
      }),
    }
  }
}
