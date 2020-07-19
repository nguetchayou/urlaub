import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlaubControlComponent } from './urlaub-control.component';

describe('UrlaubControlComponent', () => {
  let component: UrlaubControlComponent;
  let fixture: ComponentFixture<UrlaubControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlaubControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlaubControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
