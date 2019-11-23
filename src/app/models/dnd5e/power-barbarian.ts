import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'
import { BtText } from '../common/text'

export class Dnd5ePowerBarbarian extends BtBase {
  path: string
  rage_rounds: number
  rages: BtStat
  rage_damage: BtStat
  totem_beasts: BtText[]

  getProto() {
    return {
      path: 'Path of the Berserker',
      rage_rounds: 0,
      rages: new BtStat,
      rage_damage: new BtStat,
      totem_beasts: [],
    }
  }
  getLookup() {
    return {
      totem_beasts: BtText
    }
  }
}
