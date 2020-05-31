import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import { filter, tap, switchMap } from 'rxjs/operators';
import { BtPermission } from 'src/app/models/common/permission.model';
import { CampaignPlayer } from 'src/app/models/campaign/player';
import { SheetService } from 'src/app/services/sheet.service';
import { merge } from 'rxjs';

@Component({
  selector: 'bt-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})

export class CampaignsComponent implements OnInit, OnDestroy {
  public self: any = {}

  constructor(
    public store: StorageService,
    public route: ActivatedRoute,
    public svc: CampaignService,
    public sheetSvc: SheetService,
  ) { }

  ngOnInit() {
    const documentId = this.route.snapshot.paramMap.get('id');
    const existingSelf = this.store.tools[documentId]
    this.self = !!existingSelf ? existingSelf : this.svc.payload(documentId)
    this.self.meta.subscriptions.home = this.store.base$.pipe(
      switchMap(() => {
        return merge(
          this.store.setupToolController(this.self, 'campaign', [
            tap(this.self.methods.onPlayerUpdate)
          ], [
            tap(this.organizePermissions)
          ]),
          this.self.meta.collectionSubject.pipe(
            filter((collections: string[]) => collections.includes('chats')),
            tap(this.self.methods.goToBottomOfChat),
          ),
        )
      })
    ).subscribe()
  }

  private organizePermissions = (permissions: BtPermission[]) => {
    const found_ids = permissions.map((permission: BtPermission): string => {
      let player: CampaignPlayer = this.self.methods.listPlayers().find(x => x.id === permission.id)

      if (!player) {
        this.self.methods.addPlayer({
          name: permission.name,
          role: permission.role,
          id: permission.id,
          color: this.sheetSvc.getRandomColor(),
        });

        player = this.self.methods.listPlayers().find(x => x.id === permission.id)
      }

      player.name = permission.name
      player.role = permission.role

      this.self.locals.player_emails[permission.id] = permission.email
      return permission.id
    });

    // These are players who are in the model players list, but no longer have permission
    // to view the campaign, so we remove them from the list
    const stored_ids = this.self.methods.listPlayers().map(x => x.id)
    const removed_ids = stored_ids.filter(x => !found_ids.includes(x));
    removed_ids.forEach(id => this.self.methods.prunePlayerById(id))

    this.self.locals.player = this.self.methods.currentPlayer();
    this.self.locals.chat_minimized = this.self.locals.player.chat_minimized || false
    this.self.methods.setPlayerLastTab();
  };

  ngOnDestroy() {
    if (this.self.unsubscribe) {
      this.self.unsubscribe()
    }
  }

}
