import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpFaqComponent } from './faq.component';

describe('HelpFaqComponent', () => {
  let component: HelpFaqComponent;
  let fixture: ComponentFixture<HelpFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
