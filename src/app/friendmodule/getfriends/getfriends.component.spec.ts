import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetfriendsComponent } from './getfriends.component';

describe('GetfriendsComponent', () => {
  let component: GetfriendsComponent;
  let fixture: ComponentFixture<GetfriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetfriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetfriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
