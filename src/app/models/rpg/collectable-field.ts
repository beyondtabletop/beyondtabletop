import { BtBase } from '../common/base'

export class RpgCollectableField extends BtBase {
  pos: number
  field_id: string
  name: string
  input_type: string
  width: string
  space: string
  overview: boolean
  formula: string
  error: any
  valid: boolean
  rolls: boolean

  getProto() {
    return {
      pos: 0,
      field_id: 'name',
      name: 'Name',
      input_type: 'text',
      width: 'dynamic',
      space: 'none',
      overview: true,
      formula: null,
      error: null,
      valid: true,
      rolls: false,
    }
  }
}
