import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { RpgService } from 'src/app/services/rpg.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'bt-rpg-sheets',
  templateUrl: './rpg-sheets.component.html',
  styleUrls: ['./rpg-sheets.component.scss']
})

export class RpgSheetsComponent implements OnInit, OnDestroy {
  @Input() public id: string
  public self: any = {}

  constructor(
    public store: StorageService,
    public route: ActivatedRoute,
    public svc: RpgService,
  ) { }

  ngOnInit() {
    const documentId = !!this.id ? this.id : this.route.snapshot.paramMap.get('id');
    const existingSelf = this.store.tools[documentId]
    this.self = !!existingSelf ? existingSelf : this.svc.payload(documentId)
    this.self.meta.subscriptions.home = this.store.base$.pipe(
      switchMap(() => {
        return this.store.setupToolController(this.self, 'rpg')
      })
    ).subscribe()
  }

  ngOnDestroy() {
    if (this.self.unsubscribe) {
      this.self.unsubscribe()
    }
  }
}
