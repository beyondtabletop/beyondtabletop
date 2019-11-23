import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgEntityConditionComponent } from './condition.component';

describe('RpgEntityConditionComponent', () => {
  let component: RpgEntityConditionComponent;
  let fixture: ComponentFixture<RpgEntityConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgEntityConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgEntityConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
