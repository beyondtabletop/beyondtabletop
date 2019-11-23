import { BtBase } from '../common/base'
import { Dnd5eBuilderCreation } from './builder-creation'

export class Dnd5eBuilder extends BtBase {
  step: string
  creation: Dnd5eBuilderCreation

  getProto() {
    return {
      step: 'intro',
      creation: new Dnd5eBuilderCreation,
    }
  }
}
