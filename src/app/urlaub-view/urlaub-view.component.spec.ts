import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlaubViewComponent } from './urlaub-view.component';

describe('UrlaubViewComponent', () => {
  let component: UrlaubViewComponent;
  let fixture: ComponentFixture<UrlaubViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlaubViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlaubViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
