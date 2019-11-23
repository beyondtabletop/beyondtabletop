import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUpgradeComponent } from './tab-upgrade.component';

describe('TabUpgradeComponent', () => {
  let component: TabUpgradeComponent;
  let fixture: ComponentFixture<TabUpgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabUpgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
