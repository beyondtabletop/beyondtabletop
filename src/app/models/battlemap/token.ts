import { BtBase } from '../common/base'
import { BattlemapSize } from './size'
import { BattlemapPosition } from './position'

export class BattlemapToken extends BtBase {
  label: string
  color: string
  image: string
  moving: boolean
  fog: boolean
  obscure: boolean
  owner_id: string
  active: boolean
  angle: number
  size: BattlemapSize
  position: BattlemapPosition

  getProto() {
    return {
      label: 'A',
      color: null,
      image: null,
      moving: false,
      fog: false,
      obscure: false,
      owner_id: null,
      active: false,
      angle: 0,
      size: new BattlemapSize({
        width: 40,
        height: 40,
        name: 'medium',
      }),
      position: new BattlemapPosition({
        top: 1360,
        left: 1560,
      }),
    }
  }
}
