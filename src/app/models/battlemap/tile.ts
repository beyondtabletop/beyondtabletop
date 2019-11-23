import { BtBase } from '../common/base'
import { BattlemapPosition } from './position'

export class BattlemapTile extends BtBase {
  bg_x: number
  bg_y: number
  angle: number
  position: BattlemapPosition

  getProto() {
    return {
      bg_x: 0,
      bg_y: 0,
      angle: 0,
      position: new BattlemapPosition({
        top: 1400,
        left: 1600,
      }),
    }
  }
}
