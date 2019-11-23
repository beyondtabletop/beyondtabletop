import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabOverviewComponent } from './overview.component';

describe('Dnd5eTabOverviewComponent', () => {
  let component: Dnd5eTabOverviewComponent;
  let fixture: ComponentFixture<Dnd5eTabOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
