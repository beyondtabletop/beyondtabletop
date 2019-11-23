import { BtBase } from '../common/base'

export class Dnd5eWeapon extends BtBase {
  pos: number
  name: string
  attack_bonus: number
  damage_bonus: number
  crit_range: string
  crit_mult: string
  type: string
  weight: number
  melee_or_ranged: string
  reverse_ability: boolean
  is_proficient: boolean
  damage_die: string
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
      weight: 0,
      melee_or_ranged: 'Melee',
      reverse_ability: false,
      is_proficient: true,
      damage_die: 'd6',
      properties: null,
    }
  }
}
