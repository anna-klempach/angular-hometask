import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickABooComponent } from './pick-a-boo.component';

describe('PickABooComponent', () => {
  let component: PickABooComponent;
  let fixture: ComponentFixture<PickABooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickABooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickABooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
