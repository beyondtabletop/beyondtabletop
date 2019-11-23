import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'
import { BtText } from '../common/text'

export class Dnd5ePowerFighter extends BtBase {
  archetype: string
  superiority_die: string
  superiority_dice: BtStat
  surge: BtStat
  second_wind: BtStat
  maneuvers: BtText[]
  style: BtText[]

  getProto() {
    return {
      archetype: 'Champion',
      superiority_die: 'd8',
      superiority_dice: new BtStat({ value: 4, misc: 0, auto: null, remaining: 4 }),
      surge: new BtStat,
      second_wind: new BtStat,
      maneuvers: [],
      style: [
        new BtText({ text: 'Protection' }),
        new BtText({ text: 'Great Weapon Fighting' }),
      ],
    }
  }
  getLookup() {
    return {
      maneuvers: BtText
    }
  }
}
