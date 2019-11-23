import { BtBase } from './base'

export class BtStat extends BtBase {
  pos: number
  misc: number
  value: number
  auto: number
  remaining: number
  name: string

  getProto() {
    return {
      pos: null,
      misc: 0,
      value: 0,
      auto: null,
      remaining: 0,
      name: null,
    }
  }
}
