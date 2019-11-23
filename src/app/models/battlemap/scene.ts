import { BtBase } from '../common/base'
import { BattlemapToken } from './token'
import { BattlemapShape } from './shape'
import { BattlemapTile } from './tile'
import { BattlemapCombat } from './combat'
import { BattlemapCombatant } from './combatant'

export class BattlemapScene extends BtBase {
  name: string
  scene_type: string
  background_image: string
  disable_grid: boolean
  tokens: BattlemapToken[]
  shapes: BattlemapShape[]
  tiles: BattlemapTile[]
  combatants: BattlemapCombatant[]
  combat: BattlemapCombat
  $deleting?: boolean

  getProto() {
    return {
      name: '',
      scene_type: 'battle',
      background_image: '',
      disable_grid: false,
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
      combatants: [],
    }
  }
  getLookup() {
    return {
      combatants: BattlemapCombatant,
    }
  }
}
