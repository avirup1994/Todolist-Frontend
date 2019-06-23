import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GettodolistComponent } from './gettodolist.component';

describe('GettodolistComponent', () => {
  let component: GettodolistComponent;
  let fixture: ComponentFixture<GettodolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettodolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
