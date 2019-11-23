import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabListsComponent } from './lists.component';

describe('PathfinderTabListsComponent', () => {
  let component: PathfinderTabListsComponent;
  let fixture: ComponentFixture<PathfinderTabListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
