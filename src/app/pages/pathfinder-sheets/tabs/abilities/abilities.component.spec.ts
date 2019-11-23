import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabAbilitiesComponent } from './abilities.component';

describe('PathfinderTabAbilitiesComponent', () => {
  let component: PathfinderTabAbilitiesComponent;
  let fixture: ComponentFixture<PathfinderTabAbilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabAbilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
