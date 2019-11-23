import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingModalComponent } from './sharing-modal.component';

describe('SharingModalComponent', () => {
  let component: SharingModalComponent;
  let fixture: ComponentFixture<SharingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
