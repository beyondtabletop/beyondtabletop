import { BtBase } from './base'

export class BtBool extends BtBase {
  value: boolean

  getProto() {
    return {
      value: false
    }
  }
}
