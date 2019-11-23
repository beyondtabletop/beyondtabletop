import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'
import { BtText } from '../common/text'
import { BtCombatHp } from '../common/combat-hp'
import { BtCombatSpeed } from '../common/combat-speed'
import { PathfinderCombatAc } from './combat-ac'
import { PathfinderCombatDamage } from './combat-damage'


export class PathfinderCombat extends BtBase {
  hp: BtCombatHp
  dr: BtText
  sr: BtStat
  bab: BtStat
  cmb: BtStat
  cmd: BtStat
  skill_ranks: BtStat
  speed: BtCombatSpeed
  init: BtStat
  ac: PathfinderCombatAc
  attack: PathfinderCombatDamage
  damage: PathfinderCombatDamage
  weight: BtStat
  style: string
  offhand: number
  mainhand: number
  full_attack: number
  all_saves: number

  getProto() {
    return {
      hp: new BtCombatHp({ auto: 0 }),
      dr: new BtText,
      sr: new BtStat({ auto: 0 }),
      bab: new BtStat,
      cmb: new BtStat({ auto: 0 }),
      cmd: new BtStat({ auto: 0 }),
      skill_ranks: new BtStat,
      speed: new BtCombatSpeed({ auto: 0 }),
      init: new BtStat({ auto: 0 }),
      ac: new PathfinderCombatAc,
      attack: new PathfinderCombatDamage,
      damage: new PathfinderCombatDamage,
      weight: new BtStat({ auto: 0 }),
      style: 'None',
      offhand: 0,
      mainhand: 0,
      full_attack: 0,
      all_saves: 0,
    }
  }
}
