import { BtBase } from '../common/base'
import { BattlemapSize } from './size'
import { BattlemapPosition } from './position'

export class BattlemapShape extends BtBase {
  pos: number
  label: string
  round: boolean
  color: string
  image: string
  drawable: boolean
  moving: boolean
  fog: boolean
  pinned: boolean
  snapped: boolean
  tiled: boolean
  angle: number
  layer: string
  layer_id: string
  size: BattlemapSize
  position: BattlemapPosition
  window: boolean
  lines: any[]

  getProto() {
    return {
      pos: 0,
      label: null,
      round: false,
      color: 'black',
      image: null,
      drawable: false,
      moving: false,
      fog: false,
      window: false,
      pinned: false,
      snapped: true,
      tiled: false,
      angle: 0,
      layer: null,
      layer_id: null,
      size: new BattlemapSize({
        width: 80,
        height: 80,
        name: null,
      }),
      position: new BattlemapPosition({
        top: 1400,
        left: 1600,
      }),
      lines: null, // treating this like a primitive for now, should work ???
    }
  }
}
