import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabSpellPickerComponent } from './spell-picker.component';

describe('PathfinderTabSpellPickerComponent', () => {
  let component: PathfinderTabSpellPickerComponent;
  let fixture: ComponentFixture<PathfinderTabSpellPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabSpellPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabSpellPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
