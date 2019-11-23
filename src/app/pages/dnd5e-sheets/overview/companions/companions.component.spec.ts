import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewCompanionsComponent } from './companions.component';

describe('Dnd5eOverviewCompanionsComponent', () => {
  let component: Dnd5eOverviewCompanionsComponent;
  let fixture: ComponentFixture<Dnd5eOverviewCompanionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewCompanionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewCompanionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
