import { RpgCharacter } from './base';

export interface RpgPayload {
  model: RpgCharacter
  methods: any
  meta: any
  locals: any
  touch: Function
}
