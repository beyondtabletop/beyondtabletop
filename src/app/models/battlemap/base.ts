import { BtBase } from '../common/base'
import { BattlemapDetails } from './details'
import { BattlemapScene } from './scene'

export class BattlemapBase extends BtBase {
  version: number
  name: string
  oversized: boolean
  change_id: string
  campaign_id: string
  details: BattlemapDetails
  scenes: BattlemapScene[]

  getProto() {
    return {
      version: 17,
      name: 'New Battlemap',
      oversized: false,
      change_id: '0',
      campaign_id: null,
      details: new BattlemapDetails(),
      scenes: [
        new BattlemapScene()
      ]
    }
  }
}
