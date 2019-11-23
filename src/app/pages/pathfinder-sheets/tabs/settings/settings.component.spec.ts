import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabSettingsComponent } from './settings.component';

describe('PathfinderTabSettingsComponent', () => {
  let component: PathfinderTabSettingsComponent;
  let fixture: ComponentFixture<PathfinderTabSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
