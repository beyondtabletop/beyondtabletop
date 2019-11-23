import { BtBase } from '../common/base'
import { BtNote } from '../common/note'

export class PathfinderFeat extends BtBase {
  pos: number
  name: string
  summary: string
  prereq: string
  text: BtNote[]

  getProto() {
    return {
      pos: 0,
      name: null,
      summary: null,
      prereq: null,
      text: [
        new BtNote({ name: 'Benefit' }),
        new BtNote({ name: 'Normal' }),
        new BtNote({ name: 'Special' }),
        new BtNote({ name: 'Info' }),
      ]
    }
  }
}
