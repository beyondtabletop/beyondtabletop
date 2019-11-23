import { BtBase } from './base'
import { BtNote } from './note'

export class BtList extends BtBase {
  pos: number
  name: string
  special: boolean
  author_id: string
  items: BtNote[]

  getProto() {
    return {
      pos: 0,
      name: '',
      special: false,
      author_id: null,
      items: [
        new BtNote
      ]
    }
  }
}
