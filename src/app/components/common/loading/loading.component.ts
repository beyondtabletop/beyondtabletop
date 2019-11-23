import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() public self: any
  constructor() { }
}
