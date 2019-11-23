import { BtBase } from '../common/base'

export class CampaignChat extends BtBase {
  name: string
  player_id: string
  text: string
  type: string

  getProto() {
    return {
      name: null,
      player_id: null,
      text: null,
      type: 'text',
    }
  }
}
