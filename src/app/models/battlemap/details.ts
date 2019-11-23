import { BtBase } from '../common/base'
import { BattlemapSize } from './size'
import { BattlemapPosition } from './position'

export class BattlemapDetails extends BtBase {
  tile_size: number
  active_token: number
  active_scene: string
  round: number
  image: string
  hotkeys: boolean
  size: BattlemapSize
  position: BattlemapPosition

  getProto() {
    return {
      tile_size: 40,
      active_token: 0,
      active_scene: null,
      round: 1,
      image: '',
      hotkeys: true,
      size: new BattlemapSize({
        width: 4000,
        height: 4000,
      }),
      position: new BattlemapPosition({
        top: -1200,
        left: -1200,
      }),
    }
  }
}
