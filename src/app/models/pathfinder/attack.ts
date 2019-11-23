import { BtBase } from '../common/base'

export class PathfinderAttack extends BtBase {
  pos: number
  weapon: string
  attack_bonus: number
  bab: number
  source: string

  getProto() {
    return {
      pos: 0,
      weapon: null,
      attack_bonus: 0,
      bab: 0,
      source: 'user',
    }
  }
}
