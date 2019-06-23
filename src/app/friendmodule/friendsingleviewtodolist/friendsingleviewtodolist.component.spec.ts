import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsingleviewtodolistComponent } from './friendsingleviewtodolist.component';

describe('FriendsingleviewtodolistComponent', () => {
  let component: FriendsingleviewtodolistComponent;
  let fixture: ComponentFixture<FriendsingleviewtodolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsingleviewtodolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsingleviewtodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
