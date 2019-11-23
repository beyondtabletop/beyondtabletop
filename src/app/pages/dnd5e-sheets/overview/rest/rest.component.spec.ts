import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewRestComponent } from './rest.component';

describe('Dnd5eOverviewRestComponent', () => {
  let component: Dnd5eOverviewRestComponent;
  let fixture: ComponentFixture<Dnd5eOverviewRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
