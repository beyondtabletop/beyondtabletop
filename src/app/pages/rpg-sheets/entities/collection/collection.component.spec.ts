import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgEntityCollectionComponent } from './collection.component';

describe('RpgEntityCollectionComponent', () => {
  let component: RpgEntityCollectionComponent;
  let fixture: ComponentFixture<RpgEntityCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgEntityCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgEntityCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
