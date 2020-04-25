import { BtBase } from '../common/base'
import { BattlemapCombatantStats } from './combatant-stats'

export class BattlemapCombatant extends BtBase {
  sheet_id: string
  type: string
  init: number
  known: boolean
  stats: BattlemapCombatantStats
  name: string
  $token_id: string

  getProto() {
    return {
      sheet_id: null,
      type: null,
      init: null,
      known: false,
      name: 'New Combatant',
      stats: new BattlemapCombatantStats()
    }
  }
}
