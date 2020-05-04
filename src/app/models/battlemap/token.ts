import { BtBase } from '../common/base'
import { BattlemapSize } from './size'
import { BattlemapPosition } from './position'

export class BattlemapToken extends BtBase {
  label: string
  color: string
  image: string
  moving: boolean
  fog: boolean
  owner_id: string
  combatant_id: string
  active: boolean
  angle: number
  layer: string
  layer_id: string
  size: BattlemapSize
  position: BattlemapPosition

  getProto() {
    return {
      label: 'A',
      color: null,
      image: null,
      moving: false,
      fog: false,
      owner_id: null,
      combatant_id: null,
      active: false,
      angle: 0,
      layer: null,
      layer_id: null,
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
