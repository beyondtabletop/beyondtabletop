import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-active-card-dnd5e',
  templateUrl: './dnd5e.component.html',
  styleUrls: ['./dnd5e.component.scss']
})
export class BattlemapActiveCardDnd5eComponent {
  @Input() public self: any
  @Input() public sheet: any

  damageOverlay = false
  damage = 0
  health = 0

  constructor() { }

  public toggleDamagePanel(): void {
    this.damageOverlay = !this.damageOverlay
  }

  public applyDamage(): void {
    this.damage = Math.max(this.damage, 0)
    this.sheet.model.combat.hp.damage += this.damage
    this.damage = 0
    this.sheet.touch()
  }

  public applyHealing(): void {
    this.health = Math.max(this.health, 0)
    this.sheet.model.combat.hp.damage -= this.health
    this.sheet.model.combat.hp.damage = Math.max(this.sheet.model.combat.hp.damage, 0)
    this.health = 0
    this.sheet.touch()
  }
}
