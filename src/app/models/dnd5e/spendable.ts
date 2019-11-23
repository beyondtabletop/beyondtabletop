// IMPORTANT!!!!
// if you ever change this, make sure to see if it works for pathfinder too

import { BtBase } from '../common/base'

export class Dnd5eSpendable extends BtBase {
  getProto() {
    return {
      pos: 0,
      name: null,
      text: null,
      misc: 0,
      value: 0,
      auto: null,
      remaining: 0,
      reset: 'short',
    }
  }
}
