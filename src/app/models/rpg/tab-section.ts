import { BtBase } from '../common/base'

export class RpgTabSection extends BtBase {
  pos: number
  size: number
  overview: boolean

  getProto() {
    return {
      pos: 0,
      size: 12,
      overview: true,
    }
  }
}
