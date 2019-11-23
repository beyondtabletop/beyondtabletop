import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewAttacksComponent } from './attacks.component';

describe('Dnd5eOverviewAttacksComponent', () => {
  let component: Dnd5eOverviewAttacksComponent;
  let fixture: ComponentFixture<Dnd5eOverviewAttacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewAttacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewAttacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
