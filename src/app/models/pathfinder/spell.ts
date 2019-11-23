import { BtBase } from '../common/base'

export class PathfinderSpell extends BtBase {
  pos: number
  name: string
  state: string
  level: number
  text: string
  descriptor: string
  summary: string
  source: string
  remaining: number
  prepared: number
  level_string: string
  Alchemist: boolean
  Antipaladin: boolean
  Bard: boolean
  Cleric: boolean
  Druid: boolean
  Inquisitor: boolean
  Magus: boolean
  Oracle: boolean
  Paladin: boolean
  Ranger: boolean
  Sorcerer: boolean
  Summoner: boolean
  Witch: boolean
  Wizard: boolean
  deity: string
  area: string
  divine_focus: string
  domain: string
  school: string
  subschool: string
  language_dependent: string
  casting_time: string
  components: string
  costly_components: string
  duration: string
  effect: string
  range: string
  saving_throw: string
  spell_resistance: string
  targets: string

  getProto() {
    return {
      pos: 0,
      name: '',
      state: null,
      level: 0,
      text: null,
      descriptor: null,
      summary: null,
      source: 'player',
      remaining: 0,
      prepared: 0,
      level_string: null,

      Alchemist: null,
      Antipaladin: null,
      Bard: null,
      Cleric: null,
      Druid: null,
      Inquisitor: null,
      Magus: null,
      Oracle: null,
      Paladin: null,
      Ranger: null,
      Sorcerer: null,
      Summoner: null,
      Witch: null,
      Wizard: null,

      deity: null,
      area: null,
      divine_focus: null,
      domain: null,
      school: null,
      subschool: null,
      language_dependent: null,

      casting_time: null,
      components: null,
      costly_components: null,
      duration: null,
      effect: null,
      range: null,
      saving_throw: null,
      spell_resistance: null,
      targets: null,
    }
  }
}
