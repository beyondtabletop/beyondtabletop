import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabConditionsComponent } from './conditions.component';

describe('PathfinderTabConditionsComponent', () => {
  let component: PathfinderTabConditionsComponent;
  let fixture: ComponentFixture<PathfinderTabConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
