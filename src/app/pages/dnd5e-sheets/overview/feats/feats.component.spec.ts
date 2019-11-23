import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewFeatsComponent } from './feats.component';

describe('Dnd5eOverviewFeatsComponent', () => {
  let component: Dnd5eOverviewFeatsComponent;
  let fixture: ComponentFixture<Dnd5eOverviewFeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewFeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewFeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
