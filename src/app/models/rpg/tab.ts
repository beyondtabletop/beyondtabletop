import { BtBase } from '../common/base'
import { RpgTabSection } from './tab-section'

export class RpgTab extends BtBase {
  pos: number
  name: string
  sections: RpgTabSection[]

  getProto() {
    return {
      pos: 0,
      name: 'New Tab',
      sections: [
        new RpgTabSection
      ]
    }
  }
}
