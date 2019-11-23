import { BtBase } from '../common/base'

export class Dnd5eAttack extends BtBase {
  pos: number
  name: string
  attack_bonus: number
  damage_bonus: number
  damage_die: string
  ability: string
  weapon: string
  type: string
  offhand: boolean

  getProto() {
    return {
      pos: 0,
      name: null,
      attack_bonus: 0,
      damage_bonus: 0,
      damage_die: null,
      ability: 'STR',
      weapon: null,
      type: 'Physical',
      offhand: false,
    }
  }
}
