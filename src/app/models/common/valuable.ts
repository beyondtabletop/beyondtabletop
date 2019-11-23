import { BtBase } from './base'

export class BtValuable extends BtBase {
  getProto() {
    return {
      pos: 0,
      name: null,
      text: null,
      amount: 1,
      weight: 0,
      value: 0,
      currency: 'gold',
    }
  }
}
