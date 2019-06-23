import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubitemsComponent } from './addsubitems.component';

describe('AddsubitemsComponent', () => {
  let component: AddsubitemsComponent;
  let fixture: ComponentFixture<AddsubitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsubitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsubitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
