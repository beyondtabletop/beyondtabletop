import { Component } from '@angular/core'
import { BtUser } from 'src/app/models/common/user.model';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { InterfaceService } from 'src/app/services/interface.service';
import { StorageService } from 'src/app/services/storage.service';
import { of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'bt-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  public user: BtUser
  public oldName: string
  public facingId: string
  showingNav = false
  confirming = false

  constructor(
    public auth: AuthService,
    private interfaceSvc: InterfaceService,
    private store: StorageService,
    private db: AngularFireDatabase,
    ) {
    this.auth.user$.pipe(take(1)).subscribe((user: BtUser) => {
      this.user = user
      this.facingId = user.firebase_id
      this.oldName = user.name
    })
  }

  save() {
    this.auth.saveUser(this.user, this.oldName !== this.user.name)
      .then(() => this.interfaceSvc.showNotice('Changes Saved'))
      .catch(() => this.interfaceSvc.showAlert('There was an error saving your changes, please try again.'))
  }

  toggleNav() {
    this.showingNav = !this.showingNav
  }

  toggleConfirmDelete() {
    this.confirming = !this.confirming
  }

  deleteAccount() {
    // Delete all permissions for other people's docs
    this.store.base$.pipe(
      switchMap(() => this.store.player$),
      take(1),
      tap(async documents => {

        // Writer docs
        const writerPromises = documents.filter(x => x.role === 'writer').map(x => x.id).map(docId => {
          return this.store.deleteFirebaseUserPermission(docId, this.facingId)
        })

        await Promise.all(writerPromises)
        console.log('all write-access permissions deleted')

        // Owner docs
        const ownerPromises = documents.filter(x => x.role === 'owner').map(doc => {
          return this.deleteTool(doc.id, doc.tool_type)
        })

        await Promise.all(ownerPromises)
        console.log('all created documents and permissions deleted')

        await this.db.object(`players/${this.facingId}`).remove()
        console.log('all player data deleted')

        await this.db.object(`users/${this.facingId}`).remove()
        console.log('all user data deleted')

        await this.auth.signOut()
      }),
    ).subscribe()
  }

  async deleteTool(docId: string, toolType: string) {
    const paths = this.store.toolPathsForSlug(toolType)
    const ref = this.db.object(`${paths.db_path}/${docId}`)
    try {
      await ref.remove()
    } catch {
      await Promise.resolve()
    }
    return this.store.deleteFirebaseToolPermissions(docId)
  }
}
