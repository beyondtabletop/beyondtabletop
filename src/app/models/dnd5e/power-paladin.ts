import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'
import { BtText } from '../common/text'

export class Dnd5ePowerPaladin extends BtBase {
  sacred_oath: string
  divine_sense: BtStat
  lay_on_hands: BtStat
  divinity: BtStat
  cleansing_touch: BtStat
  oath_super: BtStat
  undying_sentinel: BtStat
  style: BtText[]

  getProto() {
    return {
      sacred_oath: 'Oath of Devotion',
      divine_sense: new BtStat,
      lay_on_hands: new BtStat,
      divinity: new BtStat,
      cleansing_touch: new BtStat,
      oath_super: new BtStat,
      undying_sentinel: new BtStat,
      style: [
        new BtText({ text: 'Protection' })
      ],
    }
  }
}
