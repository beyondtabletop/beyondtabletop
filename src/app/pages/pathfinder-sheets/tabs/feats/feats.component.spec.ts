import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabFeatsComponent } from './feats.component';

describe('PathfinderTabFeatsComponent', () => {
  let component: PathfinderTabFeatsComponent;
  let fixture: ComponentFixture<PathfinderTabFeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabFeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabFeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
