import { BtBase } from '../common/base'

export class PathfinderWeapon extends BtBase {
  pos: number
  name: string
  attack_bonus: number
  damage_bonus: number
  crit_range: string
  crit_mult: string
  type: string
  range: string
  ammo: string
  weight: number
  melee_or_ranged: string
  reverse_ability: boolean
  misfire: string
  dmg_s: string
  dmg_m: string
  properties: string

  getProto() {
    return {
      pos: 0,
      name: 'Weapon Name',
      attack_bonus: 0,
      damage_bonus: 0,
      crit_range: '20',
      crit_mult: 'x2',
      type: '--',
      range: null,
      ammo: null,
      weight: 0,
      melee_or_ranged: 'Melee',
      reverse_ability: false,
      misfire: null,
      dmg_s: null,
      dmg_m: null,
      properties: null,
    }
  }
}
