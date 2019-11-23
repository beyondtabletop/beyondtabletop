import { BtBase } from '../common/base'
import { RpgCollectableField } from './collectable-field'

export class RpgCollectable extends BtBase {
  pos: number
  name: string
  label_type: string
  fields: RpgCollectableField[]

  getProto() {
    return {
      pos: 0,
      name: null,
      label_type: 'none',
      fields: [
        new RpgCollectableField
      ],
    }
  }
}
