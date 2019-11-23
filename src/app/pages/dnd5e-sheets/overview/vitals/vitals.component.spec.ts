import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewVitalsComponent } from './vitals.component';

describe('Dnd5eOverviewVitalsComponent', () => {
  let component: Dnd5eOverviewVitalsComponent;
  let fixture: ComponentFixture<Dnd5eOverviewVitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewVitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
