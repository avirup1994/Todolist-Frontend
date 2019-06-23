import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendalltodolistComponent } from './friendalltodolist.component';

describe('FriendalltodolistComponent', () => {
  let component: FriendalltodolistComponent;
  let fixture: ComponentFixture<FriendalltodolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendalltodolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendalltodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
