export interface BtUser {
  firebase_id: string;
  email: string;
  google_id?: string;
  name: string;
  dnd5e_paid?: boolean
  pathfinder_paid?: boolean
  alpha_tester?: boolean
}
