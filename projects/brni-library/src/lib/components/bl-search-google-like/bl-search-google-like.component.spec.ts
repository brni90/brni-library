import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlSearchGoogleLikeComponent } from './bl-search-google-like.component';

describe('BlSearchGoogleLikeComponent', () => {
  let component: BlSearchGoogleLikeComponent;
  let fixture: ComponentFixture<BlSearchGoogleLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlSearchGoogleLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlSearchGoogleLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
