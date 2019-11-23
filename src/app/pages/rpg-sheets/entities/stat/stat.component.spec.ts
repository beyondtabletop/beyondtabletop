import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgEntityStatComponent } from './stat.component';

describe('RpgEntityStatComponent', () => {
  let component: RpgEntityStatComponent;
  let fixture: ComponentFixture<RpgEntityStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgEntityStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgEntityStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
