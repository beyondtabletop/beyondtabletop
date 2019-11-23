import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { HomebrewKitService } from 'src/app/services/homebrew-kit.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'bt-homebrew-kits',
  templateUrl: './homebrew-kits.component.html',
  styleUrls: ['./homebrew-kits.component.scss']
})

export class HomebrewKitsComponent implements OnInit {
  @Input() public id: string
  public self: any = {}

  constructor(
    public store: StorageService,
    public route: ActivatedRoute,
    public svc: HomebrewKitService,
  ) { }

  ngOnInit() {
    const documentId = !!this.id ? this.id : this.route.snapshot.paramMap.get('id');
    const existingSelf = this.store.tools[documentId]
    this.self = !!existingSelf ? existingSelf : this.svc.payload(documentId)
    this.store.base$.pipe(take(1)).subscribe(() => {
      this.store.setupToolController(this.self, 'homebrew-kit', 'home', [])
    })
  }
}
