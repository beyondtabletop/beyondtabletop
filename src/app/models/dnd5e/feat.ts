import { BtBase } from '../common/base'

export class Dnd5eFeat extends BtBase {
  pos: number
  name: string
  text: string
  summary: string
  prereq: string
  source: string

  getProto() {
    return {
      pos: 0,
      name: null,
      text: null,
      summary: null,
      prereq: null,
      source: null,
    }
  }
}
