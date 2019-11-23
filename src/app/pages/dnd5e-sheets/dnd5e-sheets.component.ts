import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { Dnd5eService } from 'src/app/services/dnd5e.service';
import { take, tap } from 'rxjs/operators';
import { BtPlayerTool } from 'src/app/models/common/player-tool.model';

@Component({
  selector: 'bt-dnd5e-sheets',
  templateUrl: './dnd5e-sheets.component.html',
  styleUrls: ['./dnd5e-sheets.component.scss']
})

export class Dnd5eSheetsComponent implements OnInit {
  @Input() public id: string
  public self: any = {}

  constructor(
    public store: StorageService,
    public route: ActivatedRoute,
    public svc: Dnd5eService,
  ) { }

  ngOnInit() {
    const documentId = !!this.id ? this.id : this.route.snapshot.paramMap.get('id');
    const existingSelf = this.store.tools[documentId]
    this.self = !!existingSelf ? existingSelf : this.svc.payload(documentId)
    this.store.base$.pipe(take(1)).subscribe(() => {
      this.store.setupToolController(this.self, 'dnd5e', 'home', [
        tap((tools: BtPlayerTool[]) => this.self.locals.tools = tools)
      ])
    })
  }
}
