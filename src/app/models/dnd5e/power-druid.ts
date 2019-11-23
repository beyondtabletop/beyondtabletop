import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'

export class Dnd5ePowerDruid extends BtBase {
  circle: string
  wild_shape: BtStat

  getProto() {
    return {
      circle: 'Circle of the Land',
      wild_shape: new BtStat,
    }
  }
}
