import { Component, OnInit } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'bt-sharing-modal',
  templateUrl: './sharing-modal.component.html',
  styleUrls: ['./sharing-modal.component.scss']
})
export class SharingModalComponent implements OnInit {

  constructor(
    public sharer: SharingService
  ) { }

  ngOnInit() {
  }

}
