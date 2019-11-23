import { BtBase } from '../common/base'
import { Dnd5eSpendable } from './spendable'

export class Dnd5ePowerCustom extends BtBase {
  keep: number
  spendables: Dnd5eSpendable[]

  getProto() {
    return {
      keep: 1,
      spendables: []
    }
  }
  getLookup() {
    return {
      spendables: Dnd5eSpendable
    }
  }
}
