// IMPORTANT!!!!
// if you ever change this, make sure to see if it works for pathfinder too
import { BtBase } from '../common/base'

export class Dnd5eCasting extends BtBase {
  prepared: boolean
  points: boolean

  getProto() {
    return {
      prepared: false,
      points: false,
    }
  }
}
