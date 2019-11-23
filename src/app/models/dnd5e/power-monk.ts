import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'
import { BtText } from '../common/text'

export class Dnd5ePowerMonk extends BtBase {
  tradition: string
  wholeness: number
  ki_points: BtStat
  martial_arts: string
  unarmored_movement: number
  disciplines: BtText[]

  getProto() {
    return {
      tradition: 'Way of the Open Hand',
      wholeness: 1,
      ki_points: new BtStat,
      martial_arts: 'd4',
      unarmored_movement: 10,
      disciplines: [],
    }
  }
  getLookup() {
    return {
      disciplines: BtText
    }
  }
}
