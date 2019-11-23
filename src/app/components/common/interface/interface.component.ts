import { Component } from '@angular/core';
import { InterfaceService } from 'src/app/services/interface.service';

@Component({
  selector: 'bt-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent {
  constructor(
    public interfaceSvc: InterfaceService
  ) { }
}
