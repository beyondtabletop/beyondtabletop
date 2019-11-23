import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAlphaVsBetaComponent } from './alpha-vs-beta.component';

describe('HelpAlphaVsBetaComponent', () => {
  let component: HelpAlphaVsBetaComponent;
  let fixture: ComponentFixture<HelpAlphaVsBetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpAlphaVsBetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpAlphaVsBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
