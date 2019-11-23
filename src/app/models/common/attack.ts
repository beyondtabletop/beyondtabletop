import { BtBase } from './base'

export class BtAttack extends BtBase {
  pos: number
  name: string
  attack_bonus: number
  damage_die: string
  damage_bonus: number
  special: string
  ability: string

  getProto() {
    return {
      pos: 0,
      name: null,
      attack_bonus: 0,
      damage_die: 'd6',
      damage_bonus: 0,
      special: null,
      ability: 'STR',
    }
  }
}
