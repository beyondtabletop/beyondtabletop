import { BtBase } from '../common/base'

export class BtSheetPrefs extends BtBase {
  tab: string
  help: boolean
  show_confirmation: boolean
  show_announcement: boolean
  active_note: string
  homebrew: boolean

  getProto() {
    return {
      tab: 'general',
      help: true,
      show_confirmation: false,
      show_announcement: true,
      active_note: null,
      homebrew: false,
    }
  }
}
