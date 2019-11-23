import { BtBase } from '../common/base'

export class Dnd5eSpell extends BtBase {
  pos: number
  name: string
  level: number
  text: string
  summary: string
  school: string
  casting: string
  range: string
  source: string
  components: string
  duration: string
  concentration: boolean
  ritual: boolean
  prepared: boolean
  $state: string
  classes: string[]

  getProto() {
    return {
      pos: 0,
      name: null,
      level: 0,
      text: null,
      summary: null,
      school: null,
      casting: null,
      range: null,
      source: null,
      components: null,
      duration: null,
      concentration: false,
      ritual: false,
      prepared: false,
      classes: null, // placeholder for primitive arrays
    }
  }
}
