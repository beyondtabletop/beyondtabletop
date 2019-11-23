import { BtBase } from '../common/base'
import { BattlemapCombatantStats } from './combatant-stats'

export class BattlemapCombatant extends BtBase {
  token_id: string
  sheet_id: string
  type: string
  init: number
  known: boolean
  stats: BattlemapCombatantStats

  getProto() {
    return {
      token_id: null,
      sheet_id: null,
      type: null,
      init: null,
      known: false,
      stats: new BattlemapCombatantStats()
    }
  }
}
