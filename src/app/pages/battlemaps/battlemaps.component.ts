import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { BattlemapService } from 'src/app/services/battlemap.service';
import { tap, map, switchMap } from 'rxjs/operators';
import { BtPlayerTool } from 'src/app/models/common/player-tool.model';

@Component({
  selector: 'bt-battlemaps',
  templateUrl: './battlemaps.component.html',
  styleUrls: ['./battlemaps.component.scss']
})

export class BattlemapsComponent implements OnInit, OnDestroy {
  @Input() public id: string
  public self: any = {}

  constructor(
    public store: StorageService,
    public route: ActivatedRoute,
    public svc: BattlemapService,
  ) { }

  ngOnInit() {
    const documentId = !!this.id ? this.id : this.route.snapshot.paramMap.get('id');
    const existingSelf = this.store.tools[documentId]
    this.self = !!existingSelf ? existingSelf : this.svc.payload(documentId)
    this.self.meta.subscriptions.home = this.store.base$.pipe(
      switchMap(() => {
        return this.store.setupToolController(this.self, 'battlemap', [
          map((tools: BtPlayerTool[]) => tools.filter(tool => {
            return ['pathfinder', 'dnd5e', 'rpg'].includes(tool.tool_type) && ['owner', 'writer'].includes(tool.role)
          })),
          tap((tools: BtPlayerTool[]) => {
            tools.forEach(x => x.updated_at = x.updated_at || 0)
            tools.sort((a, b) => b.updated_at - a.updated_at)
            tools.push({ id: null, title: 'Disconnect' } as BtPlayerTool)
            this.self.methods.onPlayerUpdate(tools)
          })
        ])
      })
    ).subscribe()
  }

  ngOnDestroy() {
    if (this.self.unsubscribe) {
      this.self.unsubscribe()
    }
  }
}
