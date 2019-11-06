import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let elementDe: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      providers: [{provide: TranslateService, useValue: {}}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    elementDe = fixture.debugElement;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise change searchValue property on input', () => {
    component.searchValue = '';
    const input = element.querySelector('input');
    const event = new KeyboardEvent('keyup', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    input.value = '1';
    input.dispatchEvent(event);
    expect(component.searchValue).toBe('1');
  });

  it('should raise the event on search button click and pass element input value as its property', () => {
    component.searchValue = 'ABC';
    let expectedValue: string;
    const button = element.querySelector('button');
    component.searchValueChange.subscribe((inputValue: string) => expectedValue = inputValue);
    button.click();
    expect(expectedValue).toBe('ABC');
    expect(component.searchValue).toBe('');
  });
});
