import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { takeWhile } from 'rxjs/operators';
import { BtUser } from '../models/common/user.model';
import { BtPermission } from '../models/common/permission.model';
import { BtPlayerTool } from '../models/common/player-tool.model';

@Injectable({
  providedIn: 'root'
})

export class SharingService {
  constructor (
    private store: StorageService,
  ) { }

  public showing_modal = false
  busy = false
  firebase: any = {}
  permissions: any = {}
  public session: any = null

  private onSharingDataLoaded = (doc: BtPlayerTool, doc_slug: string): void => {
    const paths = this.store.toolPathsForSlug(doc_slug);
    this.session = {
      doc_id: doc.id,
      doc_title: doc.title,
      doc_slug: doc_slug,
      path: paths.web_path,
    };
  };

  public linkToTool = (session: any): string => {
    return `${window.location.origin}/${session.path}/${session.doc_id}`
  }

  public inviteMailto = (email: string): string => {
    return 'mailto:' + email + '?subject=' + encodeURIComponent('Join Beyond Tabletop to see this document') + '&body=' + encodeURIComponent("I want to share a Beyond Tabletop document with you, sign up here: https://www.beyondtabletop.com");
  };

  public listDocumentPermissions = (doc_id: string): BtPermission[] => {
    return this.permissions[doc_id].list;
  };

  public closeSharingModal = (): void => {
    this.showing_modal = false;
    this.session = null;
    Object.keys(this.permissions).forEach(key => this.permissions[key].watching = false)
  };

  public openSharingModal(doc: BtPlayerTool, doc_slug: string): void {
    this.showing_modal = true;
    if (this.permissions[doc.id]) {
      this.permissions[doc.id].watching = true
      this.onSharingDataLoaded(doc, doc_slug);
    } else {
      this.permissions[doc.id] = { watching: true, list: [] }
      this.store.documentPermissions$(doc.id).pipe(
        takeWhile(() => this.permissions[doc.id].watching)
      ).subscribe(permissions => {
        this.permissions[doc.id].list = permissions
        this.onSharingDataLoaded(doc, doc_slug);
      }, () => {
        // this.session.message = 'Error loading permissions data for this tool. Please try again.'
      })
    }
  };

  public removePermission = async (permission: BtPermission): Promise<void> => {
    if (!this.busy) {
      this.busy = true;
      var doc_id = this.session.doc_id;
      await this.store.deleteFirebaseToolFromPlayer(doc_id, permission.id)
      await this.store.deleteFirebaseUserPermission(doc_id, permission.id)
      this.busy = false;
      this.session.message = `Edit access removed for ${permission.name}`;
    }
  };

  public shareDocument = async (doc_id: string, doc_slug: string, target_user: BtUser, doc_title: string): Promise<void> => {
    await this.store.createFirebasePermission(doc_id, target_user.firebase_id, {
      role: 'writer',
      email: target_user.email,
      name: target_user.name,
    })
    await this.store.addNewToolToFirebasePlayer(doc_slug, doc_id, target_user.firebase_id, 'writer', doc_title)
    this.busy = false;
    this.session.requested_email = '';
  };

  public findFirebaseUser = (): void => {
    if (!this.busy) {
      this.busy = true;

      // Reset UI vars
      this.session.message = '';
      this.session.invite = false;

      this.requestUserDetails(this.session.requested_email).then((user: BtUser) => {
        this.shareDocument(this.session.doc_id, this.session.doc_slug, user, this.session.doc_title);
        this.session.message = '';
        this.session.requested_email = '';
      }, message => {
        this.session.message = message
        this.session.requested_email = '';
      }).finally(() => this.busy = false)
    }
  };

  private requestUserDetails = (email: string): Promise<BtUser> => {
    return new Promise(async (resolve, reject) => {
      const already_has_access = Object.keys(this.permissions[this.session.doc_id]).map(key => this.permissions[this.session.doc_id][key]).some(permission => permission.email === email)
      const no_user_msg = "Looks like this user either doesn't exist or hasn't logged in in a while. In order to share this document, they will need to sign in once and authenticate with the new Firebase database."

      if (already_has_access) {
        return reject(`${email} already has access to this document.`)
      }

      const railsUser: BtUser = await this.store.findUserByEmail(email)

      if (!!railsUser) {
        resolve(railsUser)
      } else {
        reject(no_user_msg)
      }
    })
  }
}
