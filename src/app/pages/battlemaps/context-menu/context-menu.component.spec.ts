import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapContextMenuComponent } from './context-menu.component';

describe('BattlemapContextMenuComponent', () => {
  let component: BattlemapContextMenuComponent;
  let fixture: ComponentFixture<BattlemapContextMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapContextMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
