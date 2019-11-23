import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'

export class Dnd5ePowerWizard extends BtBase {
  tradition_feature: BtStat
  portent: BtStat[]

  getProto() {
    return {
      tradition_feature: new BtStat,
      portent: [
        new BtStat,
        new BtStat,
        new BtStat,
      ]
    }
  }
}
