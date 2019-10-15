import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickABooComponent } from './pick-a-boo.component';

describe('PickABooComponent', () => {
  let component: PickABooComponent;
  let fixture: ComponentFixture<PickABooComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PickABooComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickABooComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get deleted on button click', () => {
    const button = element.querySelector('button');
    let emmitted = false;
    component.deleteRequest.subscribe(() => emmitted = true);
    button.click();
    expect(emmitted).toBeTruthy();
  });
});
