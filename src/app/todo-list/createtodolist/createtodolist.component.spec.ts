import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetodolistComponent } from './createtodolist.component';

describe('CreatetodolistComponent', () => {
  let component: CreatetodolistComponent;
  let fixture: ComponentFixture<CreatetodolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatetodolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatetodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
