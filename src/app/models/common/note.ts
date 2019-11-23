import { BtBase } from './base'

export class BtNote extends BtBase {
  pos: number
  name: string
  text: string
  opened_at: number

  getProto() {
    return {
      pos: 0,
      name: null,
      text: '',
      opened_at: null,
    }
  }
}
