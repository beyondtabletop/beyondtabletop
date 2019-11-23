import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabGeneralComponent } from './general.component';

describe('PathfinderTabGeneralComponent', () => {
  let component: PathfinderTabGeneralComponent;
  let fixture: ComponentFixture<PathfinderTabGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
