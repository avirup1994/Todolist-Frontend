import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendtodolisteditComponent } from './friendtodolistedit.component';

describe('FriendtodolisteditComponent', () => {
  let component: FriendtodolisteditComponent;
  let fixture: ComponentFixture<FriendtodolisteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendtodolisteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendtodolisteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
