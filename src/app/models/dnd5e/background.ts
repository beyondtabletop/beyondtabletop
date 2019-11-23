import { BtBase } from '../common/base'
import { BtText } from '../common/text'

export class Dnd5eBackground extends BtBase {
  name: string
  traits: BtText[]
  ideals: BtText[]
  bonds: BtText[]
  flaws: BtText[]
  specialties: BtText[]

  getProto() {
    return {
      name: 'Acolyte',
      traits: [
        new BtText,
        new BtText,
      ],
      ideals: [
        new BtText
      ],
      bonds: [
        new BtText
      ],
      flaws: [
        new BtText
      ],
      specialties: [
        new BtText
      ],
    }
  }
}
