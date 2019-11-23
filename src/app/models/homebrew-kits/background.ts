import { BtBase } from '../common/base'
import { BtText } from '../common/text'
import { BtList } from '../common/list';

export class HomebrewKitDnd5eBackground extends BtBase {
  name: string
  traits: BtText[]
  ideals: BtText[]
  bonds: BtText[]
  flaws: BtText[]
  specialties: BtText[]
  specialty_name: string
  skills: string[]
  gold: number
  lists: BtList[]

  getProto() {
    return {
      name: '',
      traits: [],
      ideals: [],
      bonds: [],
      flaws: [],
      specialties: [],
      specialty_name: 'Specialties',
      skills: null,
      gold: 15,
      lists: [
        new BtList({ name: 'Equipment' }),
        new BtList({ name: 'Languages' }),
        new BtList({ name: 'Tool Proficiencies' }),
      ]
    }
  }
  getLookup() {
    return {
      traits: BtText,
      ideals: BtText,
      bonds: BtText,
      flaws: BtText,
      specialties: BtText,
    }
  }
}
