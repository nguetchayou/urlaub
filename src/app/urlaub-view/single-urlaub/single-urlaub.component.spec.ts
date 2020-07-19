import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUrlaubComponent } from './single-urlaub.component';

describe('SingleUrlaubComponent', () => {
  let component: SingleUrlaubComponent;
  let fixture: ComponentFixture<SingleUrlaubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleUrlaubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUrlaubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
