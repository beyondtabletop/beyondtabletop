import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabCompanionsComponent } from './companions.component';

describe('PathfinderTabCompanionsComponent', () => {
  let component: PathfinderTabCompanionsComponent;
  let fixture: ComponentFixture<PathfinderTabCompanionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabCompanionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabCompanionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
