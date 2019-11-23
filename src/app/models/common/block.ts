import { BtBase } from './base'

export class BtOverviewBlock extends BtBase {
  pos: number
  name: string
  type: string
  column: number

  getProto() {
    return {
      pos: 0,
      name: 'Block Name',
      type: 'attacks_block',
      column: 1,
    }
  }
}
