import { BtBase } from '../common/base'

export class PathfinderCombatDamage extends BtBase {
  misc: number
  melee: number
  ranged: number
  full: number
  standard: number
  mainhand: number
  offhand: number

  getProto() {
    return {
      misc: 0,
      melee: 0,
      ranged: 0,
      full: 0,
      standard: 0,
      mainhand: 0,
      offhand: 0,
    }
  }
}
