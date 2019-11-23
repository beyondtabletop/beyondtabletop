import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { PathfinderService } from 'src/app/services/pathfinder.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'bt-pathfinder-sheets',
  templateUrl: './pathfinder-sheets.component.html',
  styleUrls: ['./pathfinder-sheets.component.scss']
})

export class PathfinderSheetsComponent implements OnInit {
  @Input() public id: string
  public self: any = {}

  constructor(
    public store: StorageService,
    public route: ActivatedRoute,
    public svc: PathfinderService,
  ) { }

  ngOnInit() {
    const documentId = !!this.id ? this.id : this.route.snapshot.paramMap.get('id');
    const existingSelf = this.store.tools[documentId]
    this.self = !!existingSelf ? existingSelf : this.svc.payload(documentId)
    this.store.base$.pipe(take(1)).subscribe(() => {
      this.store.setupToolController(this.self, 'pathfinder', 'home', [])
    })
  }

}
