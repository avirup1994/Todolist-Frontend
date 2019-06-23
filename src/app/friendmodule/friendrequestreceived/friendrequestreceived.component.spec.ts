import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendrequestreceivedComponent } from './friendrequestreceived.component';

describe('FriendrequestreceivedComponent', () => {
  let component: FriendrequestreceivedComponent;
  let fixture: ComponentFixture<FriendrequestreceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendrequestreceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendrequestreceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
