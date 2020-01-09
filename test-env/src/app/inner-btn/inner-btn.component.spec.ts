import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerBtnComponent } from './inner-btn.component';

describe('InnerBtnComponent', () => {
  let component: InnerBtnComponent;
  let fixture: ComponentFixture<InnerBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
