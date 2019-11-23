import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'

export class Dnd5ePowerSorcerer extends BtBase {
  origin: string
  sorcery_points: BtStat
  tides_of_chaos: BtStat

  getProto() {
    return {
      origin: 'Draconic Bloodline',
      sorcery_points: new BtStat,
      tides_of_chaos: new BtStat,
    }
  }
}
