import { BtBase } from '../common/base'

export class RpgStat extends BtBase {
  pos: number
  name: string
  value: number
  auto: number
  input_type: string
  source: string

  getProto() {
    return {
      name: null,
      value: 0,
      auto: null,
      input_type: 'number',
      source: null,
    }
  }
}
