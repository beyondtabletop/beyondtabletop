import { Component, OnInit, Input } from '@angular/core';
import { Dnd5eWeapon } from 'src/app/models/dnd5e/weapon';
import { Dnd5eAttack } from 'src/app/models/dnd5e/attack';

@Component({
  selector: 'bt-dnd5e-attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.scss']
})
export class Dnd5eEditAttackComponent implements OnInit {
  @Input() public self: any
  @Input() public attack: Dnd5eAttack
  @Input() public weapon: Dnd5eWeapon

  constructor() { }

  ngOnInit() {
  }

}
