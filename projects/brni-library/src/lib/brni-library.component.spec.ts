import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrniLibraryComponent } from './brni-library.component';

describe('BrniLibraryComponent', () => {
  let component: BrniLibraryComponent;
  let fixture: ComponentFixture<BrniLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrniLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrniLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
