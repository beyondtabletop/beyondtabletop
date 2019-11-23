import { BtBase } from './base'
import { BtBool } from './bool';

export class BtCombatHp extends BtBase {
  value: number
  damage: number
  temporary: number
  misc: number
  auto: number
  death_saves: BtBool[]
  life_saves: BtBool[]

  getProto() {
    return {
      value: 0,
      damage: 0,
      temporary: 0,
      misc: 0,
      auto: 0,
      death_saves: [
        new BtBool,
        new BtBool,
        new BtBool,
      ],
      life_saves: [
        new BtBool,
        new BtBool,
        new BtBool,
      ],
    }
  }
}
