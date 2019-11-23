import { BtBase } from '../common/base'
import { BtText } from '../common/text'

export class Dnd5ePowerRanger extends BtBase {
  archetype: string
  hunters_prey: string
  defensive_tactics: string
  multiattack: string
  superior_defense: string
  favored_enemies: BtText
  favored_terrains: BtText
  style: BtText

  getProto() {
    return {
      archetype: 'Hunter',
      hunters_prey: 'Colossus Slayer',
      defensive_tactics: 'Escape the Horde',
      multiattack: 'Volley',
      superior_defense: 'Evasion',
      favored_enemies: [
        new BtText({ text: 'Humans' })
      ],
      favored_terrains: [
        new BtText({ text: 'Forest' })
      ],
      style: [
        new BtText({ text: 'Defense' })
      ],
    }
  }
}
