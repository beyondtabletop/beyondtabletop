import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'
import { Dnd5eFeat } from './feat'

export class Dnd5ePowerWarlock extends BtBase {
  patron: string
  pact_boon: string
  eldritch_master: BtStat
  patron_feature_1: BtStat
  patron_feature_2: BtStat
  patron_feature_3: BtStat
  invocations: Dnd5eFeat[]

  getProto() {
    return {
      patron: 'Archfey',
      pact_boon: 'Pact of the Chain',
      eldritch_master: new BtStat,
      patron_feature_1: new BtStat,
      patron_feature_2: new BtStat,
      patron_feature_3: new BtStat,
      invocations: [],
    }
  }
  getLookup() {
    return {
      invocations: Dnd5eFeat
    }
  }
}
