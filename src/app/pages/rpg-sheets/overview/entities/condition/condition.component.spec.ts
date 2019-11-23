import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgOverviewEntityConditionComponent } from './condition.component';

describe('RpgOverviewEntityConditionComponent', () => {
  let component: RpgOverviewEntityConditionComponent;
  let fixture: ComponentFixture<RpgOverviewEntityConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgOverviewEntityConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgOverviewEntityConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
