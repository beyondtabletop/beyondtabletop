import { BtBase } from '../common/base'
import { BtText } from '../common/text';
import { BattlemapCombatantAttack } from './combatant-attack';

export class BattlemapCombatantStats extends BtBase {
  hp: number
  damage: number
  ac: number
  init: number
  speed: number
  STR: number
  DEX: number
  CON: number
  INT: number
  WIS: number
  CHA: number
  attacks: BattlemapCombatantAttack[]
  details: BtText[]
  statuses: BtText[]

  getProto() {
    return {
      hp: 0,
      damage: 0,
      ac: 10,
      init: 0,
      speed: 30,
      STR: 10,
      DEX: 10,
      CON: 10,
      INT: 10,
      WIS: 10,
      CHA: 10,
      attacks: [ new BattlemapCombatantAttack() ],
      details: [],
      statuses: [],
    }
  }

  getLookup() {
    return {
      details: BtText,
      statuses: BtText,
    }
  }
}
