import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabItemsComponent } from './items.component';

describe('PathfinderTabItemsComponent', () => {
  let component: PathfinderTabItemsComponent;
  let fixture: ComponentFixture<PathfinderTabItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
