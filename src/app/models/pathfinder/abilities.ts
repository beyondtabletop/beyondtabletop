import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'

export class PathfinderAbilities extends BtBase {
  STR: BtStat
  DEX: BtStat
  CON: BtStat
  INT: BtStat
  WIS: BtStat
  CHA: BtStat

  getProto() {
    return {
      STR: new BtStat({ name: 'STR', value: 10, auto: 0 }),
      DEX: new BtStat({ name: 'DEX', value: 10, auto: 0 }),
      CON: new BtStat({ name: 'CON', value: 10, auto: 0 }),
      INT: new BtStat({ name: 'INT', value: 10, auto: 0 }),
      WIS: new BtStat({ name: 'WIS', value: 10, auto: 0 }),
      CHA: new BtStat({ name: 'CHA', value: 10, auto: 0 }),
    }
  }
}
