import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'

export class PathfinderCombatAc extends BtBase {
  armor: number
  shield: number
  deflection: number
  misc: number
  magic: number
  other: number
  auto: number
  natural: BtStat
  dodge: BtStat
  dex: BtStat

  getProto() {
    return {
      armor: 0,
      shield: 0,
      deflection: 0,
      misc: 0,
      magic: 0,
      other: 0,
      auto: 0,
      natural: new BtStat({ auto: 0 }),
      dodge: new BtStat({ auto: 0 }),
      dex: new BtStat({ auto: 0 }),
    }
  }
}
