import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderProfileComponent } from './profile.component';

describe('Dnd5eBuilderProfileComponent', () => {
  let component: Dnd5eBuilderProfileComponent;
  let fixture: ComponentFixture<Dnd5eBuilderProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
