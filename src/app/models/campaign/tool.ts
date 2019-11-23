import { BtBase } from '../common/base'

export class CampaignTool extends BtBase {
  tool_type: string
  title: string
  owner_id: string
  $disabled: boolean
  $role: string

  getProto() {
    return {
      tool_type: "pathfinder",
      title: "New Tool",
      owner_id: null,
    }
  }
}
