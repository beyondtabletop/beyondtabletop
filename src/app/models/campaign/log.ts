import { BtBase } from '../common/base'

export class CampaignLog extends BtBase {
  pos: number
  created_at: string
  text: string
  summary: string

  getProto() {
    return {
      pos: 0,
      created_at: null,
      text: null,
      summary: null,
    }
  }
}
