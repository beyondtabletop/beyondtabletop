import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewListsComponent } from './lists.component';

describe('Dnd5eOverviewListsComponent', () => {
  let component: Dnd5eOverviewListsComponent;
  let fixture: ComponentFixture<Dnd5eOverviewListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
