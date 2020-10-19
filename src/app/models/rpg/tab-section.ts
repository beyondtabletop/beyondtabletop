import { BtBase } from '../common/base'

export class RpgTabSection extends BtBase {
  pos: number
  size: number
  overview: boolean
  entity_ids: string[]

  getProto() {
    return {
      pos: 0,
      size: 12,
      overview: true,
      entity_ids: null,
    }
  }
}
