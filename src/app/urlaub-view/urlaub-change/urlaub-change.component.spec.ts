import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlaubChangeComponent } from './urlaub-change.component';

describe('UrlaubChangeComponent', () => {
  let component: UrlaubChangeComponent;
  let fixture: ComponentFixture<UrlaubChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlaubChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlaubChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
