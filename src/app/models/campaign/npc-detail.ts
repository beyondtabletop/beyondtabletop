import { BtBase } from '../common/base'

export class CampaignNpcDetail extends BtBase {
  pos: number
  name: string
  value: string|number
  misc: number
  group: string
  known: boolean
  $error: boolean

  getProto() {
    return {
      pos: 0,
      name: null,
      value: null,
      misc: null,
      group: null,
      known: false,
    }
  }
}
