import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlaubFormComponent } from './urlaub-form.component';

describe('UrlaubFormComponent', () => {
  let component: UrlaubFormComponent;
  let fixture: ComponentFixture<UrlaubFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlaubFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlaubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
