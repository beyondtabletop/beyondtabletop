import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'

export class PathfinderKlass extends BtBase {
  name: string
  level: number
  spell_ability: string
  spells_per_day: BtStat[]
  spells_known: BtStat[]

  getProto() {
    return {
      name: 'Barbarian',
      level: 1,
      spell_ability: 'INT',
      spells_per_day: [
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
      ],
      spells_known: [
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
      ],
    }
  }
}
