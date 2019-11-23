import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewPowersComponent } from './powers.component';

describe('Dnd5eOverviewPowersComponent', () => {
  let component: Dnd5eOverviewPowersComponent;
  let fixture: ComponentFixture<Dnd5eOverviewPowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewPowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewPowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
