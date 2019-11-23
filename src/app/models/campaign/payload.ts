import { CampaignBase } from './base';

export interface CampaignPayload {
  model: CampaignBase
  methods: any
  meta: any
  locals: any
  touch: Function
}
