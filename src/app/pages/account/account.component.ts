import { Component } from '@angular/core'
import { BtUser } from 'src/app/models/common/user.model';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { InterfaceService } from 'src/app/services/interface.service';

@Component({
  selector: 'bt-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  public user: BtUser
  public oldName: string
  public facingId: string
  showingNav = false;

  constructor(
    public auth: AuthService,
    private interfaceSvc: InterfaceService,
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
}
