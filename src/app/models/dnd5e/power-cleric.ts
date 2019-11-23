import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'

export class Dnd5ePowerCleric extends BtBase {
  divine_strike: string
  domain: string
  divinity: BtStat
  wisdom_points: BtStat

  getProto() {
    return {
      divine_strike: '',
      domain: 'Life Domain',
      divinity: new BtStat,
      wisdom_points: new BtStat,
    }
  }
}
