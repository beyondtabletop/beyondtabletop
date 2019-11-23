import { BtBase } from './base'

export class BtText extends BtBase {
  text: string

  getProto() {
    return {
      text: '',
    }
  }
}
