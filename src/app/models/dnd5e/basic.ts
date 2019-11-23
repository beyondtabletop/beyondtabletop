import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'
import { Dnd5eBackground } from './background'

export class Dnd5eBasic extends BtBase {
  race: string
  subrace: string
  size: string
  xp: number
  xp_next: number
  inspiration: number
  proficiency: BtStat
  background: Dnd5eBackground
  alignment: string
  image: string

  getProto() {
    return {
      race: 'Human',
      subrace: null,
      size: 'Medium',
      xp: 0,
      xp_next: 1000,
      inspiration: 0,
      proficiency: new BtStat,
      background: new Dnd5eBackground,
      alignment: null,
      image: null,
    }
  }
}
