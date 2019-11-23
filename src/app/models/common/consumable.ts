import { BtBase } from './base'

export class BtConsumable extends BtBase {
  pos: number
  name: string
  text: string
  amount: number
  created_at: number

  getProto() {
    return {
      pos: 0,
      name: null,
      text: null,
      amount: 1,
      created_at: 0,
    }
  }
}
