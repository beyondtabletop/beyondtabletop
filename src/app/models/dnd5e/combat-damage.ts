import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'

export class Dnd5eCombatDamage extends BtBase {
  all: BtStat
  melee: BtStat
  ranged: BtStat
  dueling: BtStat

  getProto() {
    return {
      all: new BtStat({ auto: 0 }),
      melee: new BtStat({ auto: 0 }),
      ranged: new BtStat({ auto: 0 }),
      dueling: new BtStat({ auto: 0 }),
    }
  }
}
