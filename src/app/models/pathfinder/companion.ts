import { BtBase } from '../common/base'
import { BtNote } from '../common/note'
import { BtAttack } from '../common/attack'
import { PathfinderBasic } from './basic'
import { PathfinderAbilities } from './abilities'
import { PathfinderCombat } from './combat'
import { PathfinderFeat } from './feat'
import { PathfinderSkill } from './skill'
import { PathfinderSave } from './save'

export class PathfinderCompanion extends BtBase {
  name: string
  level: number
  type: string
  basic: PathfinderBasic
  abilities: PathfinderAbilities
  combat: PathfinderCombat
  saves: PathfinderSave[]
  feats: PathfinderFeat[]
  skills: PathfinderSkill[]
  specials: BtNote[]
  attacks: BtAttack[]

  getProto() {
    return {
      name: 'Companion Name',
      level: 1,
      type: 'Animal Companion',
      basic: new PathfinderBasic,
      abilities: new PathfinderAbilities,
      combat: new PathfinderCombat,
      saves: [
        new PathfinderSave({ ability: 'CON', name: 'FORT' }),
        new PathfinderSave({ ability: 'DEX', name: 'REF' }),
        new PathfinderSave({ ability: 'WIS', name: 'WILL' }),
      ],
      feats: [],
      skills: [],
      specials: [],
      attacks: [],
    }
  }
  getLookup() {
    return {
      feats: PathfinderFeat,
      skills: PathfinderSkill,
      specials: BtNote,
      attacks: BtAttack,
    }
  }
}
