import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderSheetsComponent } from './pathfinder-sheets.component';

describe('PathfinderSheetsComponent', () => {
  let component: PathfinderSheetsComponent;
  let fixture: ComponentFixture<PathfinderSheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderSheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
