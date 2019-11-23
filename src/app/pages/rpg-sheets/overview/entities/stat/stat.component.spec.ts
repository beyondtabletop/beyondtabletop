import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgOverviewEntityStatComponent } from './stat.component';

describe('RpgOverviewEntityStatComponent', () => {
  let component: RpgOverviewEntityStatComponent;
  let fixture: ComponentFixture<RpgOverviewEntityStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgOverviewEntityStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgOverviewEntityStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
