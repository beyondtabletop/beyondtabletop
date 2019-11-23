import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { RpgService } from 'src/app/services/rpg.service';
import { take } from 'rxjs/operators';
import { BtPlayerTool } from 'src/app/models/common/player-tool.model';

@Component({
  selector: 'bt-rpg-sheets',
  templateUrl: './rpg-sheets.component.html',
  styleUrls: ['./rpg-sheets.component.scss']
})

export class RpgSheetsComponent implements OnInit {
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
    this.store.base$.pipe(take(1)).subscribe(() => {
      this.store.setupToolController(this.self, 'rpg', 'home', [])
    })
  }

}
