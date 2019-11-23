import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss']
})
export class BattlemapDetailLayerComponent implements OnInit {
  @Input() public self: any
  @Input() public item: any

  constructor() { }

  ngOnInit() {
  }

}
