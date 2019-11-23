import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'
import { BtCombatHp } from '../common/combat-hp'
import { BtCombatSpeed } from '../common/combat-speed'
import { Dnd5eCombatAc } from './combat-ac'
import { Dnd5eCombatDamage } from './combat-damage'

export class Dnd5eCombat extends BtBase {
  all_saves: number
  hp: BtCombatHp
  speed: BtCombatSpeed
  init: BtStat
  ac: Dnd5eCombatAc
  weight: BtStat
  attack: Dnd5eCombatDamage
  damage: Dnd5eCombatDamage

  getProto() {
    return {
      all_saves: 0,
      hp: new BtCombatHp,
      speed: new BtCombatSpeed,
      init: new BtStat({ auto: 0 }),
      ac: new Dnd5eCombatAc,
      weight: new BtStat({ auto: 0 }),
      attack: new Dnd5eCombatDamage,
      damage: new Dnd5eCombatDamage,
    }
  }
}
