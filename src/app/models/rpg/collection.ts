import { BtBase } from '../common/base'
import { RpgCollectionItem } from './collection-item'

export class RpgCollection extends BtBase {
  pos: number
  name: string
  tab: string
  section: string
  collectable: string
  items: RpgCollectionItem[]

  getProto() {
    return {
      pos: 0,
      name: null,
      tab: null,
      section: null,
      collectable: null,
      items: []
    }
  }
  getLookup() {
    return {
      items: RpgCollectionItem
    }
  }
}
