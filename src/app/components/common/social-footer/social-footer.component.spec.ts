import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialFooterComponent } from './social-footer.component';

describe('SocialFooterComponent', () => {
  let component: SocialFooterComponent;
  let fixture: ComponentFixture<SocialFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
