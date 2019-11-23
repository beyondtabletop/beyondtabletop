import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticContainerComponent } from './static-container.component';

describe('StaticContainerComponent', () => {
  let component: StaticContainerComponent;
  let fixture: ComponentFixture<StaticContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
