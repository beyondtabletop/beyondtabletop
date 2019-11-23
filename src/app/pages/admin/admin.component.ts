import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { BtUser } from 'src/app/models/common/user.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Component({
  selector: 'bt-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  public email: string
  public user: BtUser
  public uid: string

  constructor(
    public store: StorageService,
    private db: AngularFireDatabase,
  ) { }

  findUserByEmail() {
    this.store.findUserByEmail(this.email).then((user: BtUser) => this.user = user)
  }

  destroyUser() {
    this.store.destroyUser(this.uid)
  }

  repairPermissions() {
    // this.db.object('permissions').valueChanges().pipe(take(1)).subscribe(permissions => {
    //   Object.keys(permissions).forEach(docId => {
    //     const docPermissions = permissions[docId]
    //     Object.keys(docPermissions).forEach(userId => {
    //       if (userId === 'undefined') {
    //         const permission = docPermissions[userId]
    //         console.log({
    //           permission, userId, docId
    //         })
    //       }
    //     })
    //   })
    // })
  }
}
