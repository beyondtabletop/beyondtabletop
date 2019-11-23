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
  obscure: boolean
  pinned: boolean
  snapped: boolean
  tiled: boolean
  angle: number
  size: BattlemapSize
  position: BattlemapPosition
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
      obscure: false,
      pinned: false,
      snapped: true,
      tiled: false,
      angle: 0,
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
