import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendrequestsentComponent } from './friendrequestsent.component';

describe('FriendrequestsentComponent', () => {
  let component: FriendrequestsentComponent;
  let fixture: ComponentFixture<FriendrequestsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendrequestsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendrequestsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
