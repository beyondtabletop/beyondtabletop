import { BtBase } from '../common/base'
import { BtStat } from '../common/stat'

export class Dnd5ePowerBard extends BtBase {
  inspiration_die: string
  song_of_rest: string
  college: string
  inspiration: BtStat

  getProto() {
    return {
      inspiration_die: 'd6',
      song_of_rest: 'd6',
      college: 'College of Lore',
      inspiration: new BtStat,
    }
  }
}
