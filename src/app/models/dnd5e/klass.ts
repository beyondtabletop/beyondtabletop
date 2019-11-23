import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'

export class Dnd5eKlass extends BtBase {
  pos: number
  name: string
  level: number
  hit_dice: BtStat
  hit_die: string
  spell_ability: string
  spells_known: number
  slot_level: number
  cantrips: number

  getProto() {
    return {
      pos: 0,
      name: 'Barbarian',
      level: 1,
      hit_dice: new BtStat,
      hit_die: 'd12',
      spell_ability: 'INT',
      spells_known: 0,
      slot_level: 0,
      cantrips: 0,
    }
  }
}
