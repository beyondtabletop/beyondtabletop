import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'

export class Dnd5ePowerRogue extends BtBase {
  sneak_attack: string
  archetype: string
  stroke_of_luck: BtStat
  spell_thief: BtStat

  getProto() {
    return {
      sneak_attack: '1d6',
      archetype: 'Thief',
      stroke_of_luck: new BtStat,
      spell_thief: new BtStat,
    }
  }
}
