import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-homebrew-kit-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class HomebrewKitCollectionComponent {
  @Input() public self: any
  @Input() public collection: any
  @Input() public parent: string
  constructor() { }

  any() {
    return this.self.methods.$any(this.self.model[this.parent][this.collection.dbSlug])
  }

  add() {
    this.self.methods.$add(this.self.model[this.parent], this.collection.dbSlug, this.collection.modelClass)
  }

  active() {
    return this.self.methods.$active(this.collection.dbSlug)
  }

  select(item: any) {
    this.self.methods.$select(this.collection.dbSlug, item)
  }

  remove(item: any) {
    this.self.methods.$remove(this.self.model[this.parent][this.collection.dbSlug], item, this.collection.dbSlug)
  }

  list() {
    return this.self.methods.$list(this.self.model[this.parent][this.collection.dbSlug])
  }
}
