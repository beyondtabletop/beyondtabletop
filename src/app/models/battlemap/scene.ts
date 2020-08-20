import { BtBase } from '../common/base'
import { BattlemapToken } from './token'
import { BattlemapShape } from './shape'
import { BattlemapTile } from './tile'
import { BattlemapCombat } from './combat'
import { BattlemapLayer } from './layer'

export class BattlemapScene extends BtBase {
  name: string
  scene_type: string
  background_image: string
  disable_grid: boolean
  tokens: BattlemapToken[]
  shapes: BattlemapShape[]
  tiles: BattlemapTile[]
  layers: BattlemapLayer[]
  combat: BattlemapCombat
  $deleting?: boolean
  mask: boolean

  getProto() {
    return {
      name: '',
      scene_type: 'battle',
      background_image: '',
      disable_grid: false,
      mask: false,
      combat: new BattlemapCombat(),
      tokens: [
        new BattlemapToken({ active: true })
      ],
      shapes: [
        new BattlemapShape()
      ],
      tiles: [
        new BattlemapTile()
      ],
      layers: []
    }
  }
  getLookup() {
    return {
      layers: BattlemapLayer
    }
  }
}
