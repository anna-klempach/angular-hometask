import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialogComponent } from './modal-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ModalDialogComponent', () => {
  let component: ModalDialogComponent;
  let fixture: ComponentFixture<ModalDialogComponent>;
  let compDe: DebugElement;
  let compEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDialogComponent],
      providers: [{provide: TranslateService, useValue: {}}],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogComponent);
    component = fixture.componentInstance;
    compDe = fixture.debugElement;
    compEl = compDe.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on button delete click', () => {
    spyOn(component.deleteItem, 'emit');
    const buttons = compDe.queryAll(By.css('.dialog-button'));
    expect(buttons.length).toBe(2);
    const approveButton: DebugElement = buttons[0];
    const approveButtonEl: HTMLButtonElement = approveButton.nativeElement;
    approveButtonEl.click();
    expect(component.deleteItem.emit).toHaveBeenCalledWith(true);

    const declineButton: DebugElement = buttons[1];
    const declineButtonEl: HTMLButtonElement = declineButton.nativeElement;
    declineButtonEl.click();
    expect(component.deleteItem.emit).toHaveBeenCalledWith(false);
  });
});
